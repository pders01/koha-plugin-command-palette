package Koha::Plugin::Xyz::Paulderscheid::CommandPalette::ExtractRoutes;

use Modern::Perl;
use utf8;
use 5.032;
use English qw(-no_match_vars);
use Carp;

use Cache::Memcached::Fast;
use File::Find;
use IO::Compress::Gzip qw(gzip $GzipError);
use IO::Uncompress::Gunzip qw(gunzip $GunzipError);
use JSON;
use Storable;
use SQL::Abstract;

use C4::Context;
use Koha::Plugin::Xyz::Paulderscheid::CommandPalette;

my $self = Koha::Plugin::Xyz::Paulderscheid::CommandPalette->new;

use base 'Exporter';
our @EXPORT_OK = qw(extract);

our $VERSION = '1.0.0';

sub extract {
    my ($dir) = @_;

    my @files;
    find(
        sub {
            return if !-f;                                                      # Skip anything that's not a file
            return if !/[.]pl\z/smx;                                            # Skip anything that's not a .pl file
            return if $File::Find::name =~ m{(^|/)installer|errors(/|$)}smx;    # Skip anything that has 'installer' or 'error' in it

            # Save the file's path, removing the base directory for the route
            ( my $route = $File::Find::name ) =~ s/\Q$dir\E//smx;
            push @files, $route;
        },
        $dir
    );

    my $messages = [];
    push @{$messages}, _store_in_db( \@files );

    return $messages;
}

sub _store_in_db {
    my ($files) = @_;

    my $dbh = C4::Context->dbh;
    my $sql = SQL::Abstract->new;

    # Prepare SQL statements
    my ( $stmt, @bind );
    my $sth;

    # Delete all previous routes and indices w/ sql abstract
    ( $stmt, @bind ) = $sql->delete( $self->get_qualified_table_name('routes') );
    $sth = $dbh->prepare($stmt);
    $sth->execute(@bind) or _croak_with_error { $dbh->errstr };

    ( $stmt, @bind ) = $sql->delete( $self->get_qualified_table_name('index') );
    $sth = $dbh->prepare($stmt);
    $sth->execute(@bind) or _croak_with_error { $dbh->errstr };

    foreach my $route ( @{$files} ) {

        # Insert route into routes table
        ( $stmt, @bind ) = $sql->insert( $self->get_qualified_table_name('routes'), { route => $route } );
        $sth = $dbh->prepare($stmt);
        $sth->execute(@bind) or _croak_with_error { $dbh->errstr };

        # Get the ID of the inserted route
        my $route_id = $dbh->last_insert_id( undef, undef, 'routes', 'id' );

        # Split route into path fragments and insert each fragment into route_index table
        my @parts = split /\//smx, $route;
        foreach my $part (@parts) {
            ( $stmt, @bind ) = $sql->insert( $self->get_qualified_table_name('index'), { route_id => $route_id, index_term => $part } );
            $sth = $dbh->prepare($stmt);
            $sth->execute(@bind) or _croak_with_error { $dbh->errstr };
        }
    }

    return "Route information has been stored in the database\n";
}

sub _croak_with_error {
    my $error = shift;
    croak $error if $error;
    return;
}

1;
