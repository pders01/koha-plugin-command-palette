use strict;
use warnings;
use feature 'class';
use feature 'signatures';
use lib './local/lib/perl5';

use DateTime     ();
use Data::Dumper ();

use Local::Util ();

no warnings 'experimental::class';

## no critic qw(ValuesAndExpressions::RequireInterpolationOfMetachars)

class Local::Metadata v0.0.1 {

    field $author;
    field $date_authored;
    field $date_updated;
    field $description;
    field $max_koha_version;
    field $min_koha_version;
    field $name;
    field $release_filename;
    field $static_dir_name;
    field $version;

    ADJUST {
        my $metadata = $self->_from_env;

        $self->author( $metadata->{'author'}                     // undef );
        $self->date_authored( $metadata->{'date_authored'}       // undef );
        $self->date_updated( $metadata->{'date_updated'}         // undef );
        $self->description( $metadata->{'description'}           // undef );
        $self->max_koha_version( $metadata->{'max_koha_version'} // undef );
        $self->min_koha_version( $metadata->{'min_koha_version'} // undef );
        $self->name( $metadata->{'name'}                         // undef );
        $self->release_filename( $metadata->{'release_filename'} // undef );
        $self->static_dir_name( $metadata->{'static_dir_name'}   // undef );
        $self->version( $metadata->{'version'}                   // undef );

        return;
    }

    method _accessor( $field, $value = undef ) {
        if ( defined $value ) {
            return ${$field} = $value;
        }

        return ${$field};
    }

    method author( $value           = undef ) { return $self->_accessor( \$author,           $value ); }
    method date_authored( $value    = undef ) { return $self->_accessor( \$date_authored,    $value ); }
    method date_updated( $value     = undef ) { return $self->_accessor( \$date_updated,     $value ); }
    method description( $value      = undef ) { return $self->_accessor( \$description,      $value ); }
    method max_koha_version( $value = undef ) { return $self->_accessor( \$max_koha_version, $value ); }
    method min_koha_version( $value = undef ) { return $self->_accessor( \$min_koha_version, $value ); }
    method name( $value             = undef ) { return $self->_accessor( \$name,             $value ); }
    method release_filename( $value = undef ) { return $self->_accessor( \$release_filename, $value ); }
    method static_dir_name( $value  = undef ) { return $self->_accessor( \$static_dir_name,  $value ); }
    method version( $value          = undef ) { return $self->_accessor( \$version,          $value ); }

    method _from_env() {
        return { map { $self->_entries($_) } grep {/^PLUGIN_/smx} keys %ENV };
    }

    method _entries($env_key) {
        ( my $key = $env_key ) =~ s/^PLUGIN_//smx;
        return ( lc $key, $ENV{$env_key} );
    }

    method validate() {
        if ( !$self->author ) {
            $self->log( 'warning', 'author is unset' );
        }

        if ( !$self->date_authored || $self->date_authored eq 'today' ) {
            $self->log( 'warning', q{date_authored is set to default: today; rewriting to iso format} );
            $self->date_authored( DateTime->now->ymd );
        }

        if ( !$self->date_updated || $self->date_updated eq 'today' ) {
            $self->log( 'warning', q{date_updated is set to default: today; rewriting to iso format} );
            $self->date_updated( DateTime->now->ymd );
        }

        if ( !$self->description ) {
            $self->log( 'warning', 'description is unset' );
        }

        if ( !$self->max_koha_version ) {
            $self->log( 'warning', 'max_koha_version is unset' );
        }

        if ( !$self->min_koha_version ) {
            $self->log( 'warning', 'min_koha_version is unset' );
        }

        if ( !$self->name ) {
            $self->log( 'error', 'name is unset (required), use format: Koha::Plugin::<TLD>::<ORG>::<PROJECT>' ) and return;
        }

        if ( @{ [ split /::/smx, $self->name ] } != 5 ) {
            $self->log( 'error', 'name validation failed, use format: Koha::Plugin::<TLD>::<ORG>::<PROJECT>' ) and return;
        }

        if ( !$self->release_filename ) {
            $self->log( 'warning', 'release_filename is unset' );
        }

        if ( !$self->static_dir_name ) {
            $self->log( 'warning', 'static_dir_name is unset' );
        }

        if ( !$self->version ) {
            $self->log( 'warning', 'version is unset' );
        }

        return 1;
    }

    method to_hashref() {
        return {
            author           => $self->author,
            date_authored    => $self->date_authored,
            date_updated     => $self->date_updated,
            description      => $self->description,
            max_koha_version => $self->max_koha_version,
            min_koha_version => $self->min_koha_version,
            name             => $self->name,
            release_filename => $self->release_filename,
            static_dir_name  => $self->static_dir_name,
            version          => $self->version,
        };
    }

    method stringify() {
        my $dumper = Data::Dumper->new( [ $self->to_hashref ] );
        $dumper->Terse(1);
        $dumper->Sortkeys(1);

        my $stringified_metadata = $dumper->Dump;

        # Remove the enclosing curly braces.
        $stringified_metadata =~ s/^[{]|[}]$//smxg;

        # Trim leading and trailing whitespace
        $stringified_metadata =~ s/^\s+|\s+$//smxg;

        return $stringified_metadata;
    }

    method log( $level, $message ) {    ## no critic qw(Subroutines::ProhibitBuiltinHomonyms)
        return Local::Util::l( $level, $message );
    }

    }

    1;
