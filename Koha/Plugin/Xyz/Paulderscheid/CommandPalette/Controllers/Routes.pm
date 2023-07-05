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
use Koha::Plugin::Xyz::Paulderscheid::CommandPalette::lib::Trie;
use Koha::Plugin::Xyz::Paulderscheid::CommandPalette::ExtractRoutes qw(extract);

my $self = Koha::Plugin::Xyz::Paulderscheid::CommandPalette->new;

our $VERSION = '1.0.0';

sub list {
    my $c = shift->openapi->valid_input or return;

    return try {
        my $path = $c->param('path') // q{};

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
            my $trie = Koha::Plugin::Xyz::Paulderscheid::CommandPalette::lib::Trie->new();
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

1;
