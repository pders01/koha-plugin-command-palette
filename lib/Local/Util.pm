package Local::Util v0.0.1;

use strict;
use warnings;
use feature 'signatures';
use lib './local/lib/perl5';

use Carp            qw( croak );
use Term::ANSIColor qw( colored );

use Exporter 'import';

our @EXPORT_OK = qw(l);

sub l( $type, $message ) {    ## no critic qw(ValuesAndExpressions::RequireInterpolationOfMetachars)
    print {
        info    => colored( "$message\n",          'bright_cyan' ),
        warning => colored( "warning: $message\n", 'bright_yellow' ),
        error   => colored( "error: $message\n",   'bright_red' ),
    }->{ $type // 'info' }
        or croak;

    return 1;
}

1;
