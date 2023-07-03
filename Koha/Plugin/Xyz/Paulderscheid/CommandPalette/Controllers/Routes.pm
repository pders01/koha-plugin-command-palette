package Koha::Plugin::Xyz::Paulderscheid::CommandPalette::Controllers::Routes;

use Modern::Perl;
use utf8;
use 5.032;
use English qw(-no_match_vars);

use Cache::Memcached::Fast;
use IO::Compress::Gzip qw(gzip $GzipError);
use IO::Uncompress::Gunzip qw(gunzip $GunzipError);
use Mojo::Base 'Mojolicious::Controller';
use Storable;
use Readonly;
use Try::Tiny;
use SQL::Abstract;

use C4::Context;
use Koha::Plugin::Xyz::Paulderscheid::CommandPalette;
use Koha::Plugin::Xyz::Paulderscheid::CommandPalette::ExtractRoutes qw(extract);

my $self = Koha::Plugin::Xyz::Paulderscheid::CommandPalette->new;

our $VERSION = '1.0.0';

Readonly my $MAX_ROUTES => 20;

# '/usr/share/koha/intranet/cgi-bin'

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

        my $routes = $sth->fetchall_arrayref;

        return $c->render( status => 200, openapi => $routes );
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

    my $count_arr = $sth->fetchall_arrayref;
    my $count     = $count_arr->[0]->[0];

    return $count;
}

1;