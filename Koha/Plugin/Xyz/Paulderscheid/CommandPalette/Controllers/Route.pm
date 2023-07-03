package Koha::Plugin::Xyz::Paulderscheid::CommandPalette::Controllers::Route;

use Modern::Perl;
use utf8;
use 5.032;
use English qw(-no_match_vars);

use Mojo::Base 'Mojolicious::Controller';
use Readonly;
use Try::Tiny;
use SQL::Abstract;

use C4::Context;
use Koha::Plugin::Xyz::Paulderscheid::CommandPalette;
use Koha::Plugin::Xyz::Paulderscheid::CommandPalette::ExtractRoutes qw(extract);

my $self = Koha::Plugin::Xyz::Paulderscheid::CommandPalette->new;

our $VERSION = '1.0.0';

Readonly my $MAX_ROUTES => 20;

# sub get {
#     my $c = shift->openapi->valid_input or return;

#     return try {
#         my $query = $c->param('query') // q{};
#         my $dbh   = C4::Context->dbh;
#         my $sql   = SQL::Abstract->new;

#         my ( $stmt, @bind ) = $sql->select( $self->get_qualified_table_name('index'), 'route_id', { index_term => { -like => q{%} . $query . q{%} } }, { order => '-asc' } );
#         my $sth       = $dbh->prepare($stmt);
#         my $route_ids = $sth->execute(@bind);

#         my @routes;
#         for my $route_id (@route_ids) {
#             ( $stmt, @bind ) = $sql->select( $self->get_qualified_table_name('routes'), 'route', { id => $route_id }, );
#             $sth = $dbh->prepare($stmt);
#             my $route = $sth->execute(@bind);
#             push @routes, $route;
#         }

#         return $c->render( status => 200, openapi => \@routes );

#         # }
#     }
#     catch {
#         $c->unhandled_exception($_);
#     };
# }

1;
