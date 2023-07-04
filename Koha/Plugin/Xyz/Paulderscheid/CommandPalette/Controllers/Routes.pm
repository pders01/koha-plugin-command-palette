package Koha::Plugin::Xyz::Paulderscheid::CommandPalette::Controllers::Routes;

use Modern::Perl;
use utf8;
use 5.032;
use English qw(-no_match_vars);

use Mojo::Base 'Mojolicious::Controller';
use Try::Tiny;
use SQL::Abstract;

use C4::Context;
use Koha::Plugin::Xyz::Paulderscheid::CommandPalette;
use Koha::Plugin::Xyz::Paulderscheid::CommandPalette::ExtractRoutes qw(extract);

my $self = Koha::Plugin::Xyz::Paulderscheid::CommandPalette->new;

our $VERSION = '1.0.0';

sub list {
    my $c = shift->openapi->valid_input or return;

    return try {
        my $path = $c->param('path') // q{};
        my $dbh  = C4::Context->dbh;
        my $sql  = SQL::Abstract->new;

        my $has_routes = _count_routes() > 0;
        if ( !$has_routes ) {
            extract('/usr/share/koha/intranet/cgi-bin');
        }

        if ($path) {
            my @search_terms = split /[\/\s]+/smx, $path;

            my %route_id_counts;
            for my $search_term (@search_terms) {
                my ( $stmt, @bind ) = $sql->select( $self->get_qualified_table_name('index'), 'route_id', { index_term => { -like => q{%} . $search_term . q{%} } } );
                my $sth = $dbh->prepare($stmt);
                $sth->execute(@bind);

                while ( my ($route_id) = $sth->fetchrow_array ) {
                    $route_id_counts{$route_id}++;
                }
            }

            # Keep only the route_ids that were found for each search term
            my @final_route_ids = grep { $route_id_counts{$_} == scalar @search_terms } keys %route_id_counts;

            my @routes;
            for my $route_id (@final_route_ids) {
                my ( $stmt, @bind ) = $sql->select( $self->get_qualified_table_name('routes'), 'route', { id => $route_id }, { -asc => 'route' } );
                my $sth = $dbh->prepare($stmt);
                $sth->execute(@bind);

                while ( my ($route) = $sth->fetchrow_array ) {
                    push @routes, $route;
                }
            }

            return $c->render( status => 200, openapi => \@routes );
        }
        else {
            my ( $stmt, @bind ) = $sql->select( $self->get_qualified_table_name('routes'), 'route', undef, { -asc => 'route' } );
            my $sth = $dbh->prepare($stmt);
            $sth->execute(@bind);

            my @routes;
            while ( my ($route) = $sth->fetchrow_array ) {
                push @routes, $route;
            }

            return $c->render( status => 200, openapi => \@routes );
        }
        catch {
            $c->unhandled_exception($_);
        };
    }
}

sub _count_routes {
    my $dbh = C4::Context->dbh;
    my $sql = SQL::Abstract->new;

    my ( $stmt, @bind ) = $sql->select( $self->get_qualified_table_name('routes'), 'COUNT(id)' );
    my $sth = $dbh->prepare($stmt);
    $sth->execute(@bind);

    my ($count) = $sth->fetchrow_array;

    return $count;
}

1;
