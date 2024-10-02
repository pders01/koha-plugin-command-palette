package Local::ExtractRoutes;

use strict;
use warnings;
use utf8;
use English qw(-no_match_vars);

use C4::Context ();

use Cache::Memcached::Fast ();
use Carp                   qw( croak );
use File::Find             qw( find );
use JSON                   ();
use SQL::Abstract          ();

use Koha::Plugin::Xyz::Paulderscheid::CommandPalette;

use base 'Exporter';

our @EXPORT_OK = qw(extract);

our $VERSION = '1.0.0';

my $self = Koha::Plugin::Xyz::Paulderscheid::CommandPalette->new;

sub extract {
    my ($dir) = @_;

    my @files;
    find(
        sub {
            return if !-f;              # Skip anything that's not a file
            return if !/[.]pl\z/smx;    # Skip anything that's not a .pl file
            return
                if $File::Find::name
                =~ m{(^|/)installer|errors(/|$)}smx;    # Skip anything that has 'installer' or 'error' in it

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

    foreach my $route ( @{$files} ) {

        # Insert route into routes table
        ( $stmt, @bind ) = $sql->insert( $self->get_qualified_table_name('routes'), { route => $route } );
        $sth = $dbh->prepare($stmt);
        $sth->execute(@bind) or _croak_with_error { $dbh->errstr };
    }

    return "Route information has been stored in the database\n";
}

sub _croak_with_error {
    my $error = shift;
    croak $error if $error;
    return;
}

1;
