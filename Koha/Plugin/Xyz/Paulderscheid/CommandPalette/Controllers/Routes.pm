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
        my $query = $c->param('query') // q{};
        my $dbh   = C4::Context->dbh;
        my $sql   = SQL::Abstract->new;

        my $has_routes = _count_routes() > 0;
        if ( !$has_routes ) {
            extract('/usr/share/koha/intranet/cgi-bin');
        }

        my ( $stmt, @bind ) = $sql->select( $self->get_qualified_table_name('routes'), 'route' );
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
