package Koha::Plugin::Xyz::Paulderscheid::CommandPalette::Controllers::Routes;

use strict;
use warnings;
use utf8;
use English qw(-no_match_vars);

use Mojo::Base qw(Mojolicious::Controller);

use C4::Context;

use Cwd            qw( abs_path );
use File::Basename qw( dirname );
use File::Spec     ();
use SQL::Abstract  ();
use Try::Tiny      qw( catch try );

use lib File::Spec->catdir( dirname( abs_path(__FILE__) ), q{..}, 'lib' );

use Trie;
use Local::ExtractRoutes qw(extract);

use Koha::Plugin::Xyz::Paulderscheid::CommandPalette;

our $VERSION = '1.0.0';

my $self = Koha::Plugin::Xyz::Paulderscheid::CommandPalette->new;

sub list {
    my $c = shift->openapi->valid_input or return;

    return try {
        my $path = $c->param('path') // q{};

        my $has_routes = _count_routes() > 0;
        if ( !$has_routes ) {
            extract('/usr/share/koha/intranet/cgi-bin');
        }

        my $dbh = C4::Context->dbh;
        my $sql = SQL::Abstract->new;

        # 1. Extract the routes from the database
        my ( $stmt, @bind ) = $sql->select( $self->get_qualified_table_name('routes'), 'route', undef, { -asc => 'route' } );
        my $sth = $dbh->prepare($stmt);
        $sth->execute(@bind);

        my @routes;
        while ( my ($route) = $sth->fetchrow_array ) {
            push @routes, $route;
        }

        if ($path) {

            # 2. Create and populate the Trie with these routes
            my $trie = Trie->new();
            foreach my $route (@routes) {
                $trie->insert($route);
            }

            # Use the Trie to find the matches for the given path prefix
            my @matching_routes = $trie->search($path);
            if (@matching_routes) {
                return $c->render( status => 200, openapi => \@matching_routes );
            }
            else {
                return $c->render( status => 404, openapi => { message => 'No matching routes.' } );
            }
        }
        else {
            return $c->render( status => 200, openapi => \@routes );
        }
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
