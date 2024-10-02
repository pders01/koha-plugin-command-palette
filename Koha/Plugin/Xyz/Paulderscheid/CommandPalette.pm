package Koha::Plugin::Xyz::Paulderscheid::CommandPalette;

## It's good practice to use Modern::Perl
use Modern::Perl;
use utf8;
use 5.032;
use English qw(-no_match_vars);
use Carp;

use C4::Context;
use JSON;

## Required for all plugins
use base qw(Koha::Plugins::Base);

## Here we set our plugin version
our $VERSION         = '1.0.0';
our $MINIMUM_VERSION = '21.05';

## Here is our metadata, some keys are required, some are optional
our $METADATA = {
    name            => 'Command Palette',
    author          => 'Paul Derscheid <me@paulderscheid.xyz>',
    date_authored   => '2023-06-29',
    date_updated    => '2023-06-29',
    minimum_version => $MINIMUM_VERSION,
    maximum_version => undef,
    version         => $VERSION,
    description     => <<~'EOL',
        This plugin adds a command palette to the Koha staff client.
        It aims to make navigation easier for power users.
    EOL
};

## This is the minimum code required for a plugin's 'new' method
## More can be added, but none should be removed
sub new {
    my ( $class, $args ) = @_;

    ## We need to add our metadata here so our base class can access it
    $args->{'metadata'} = $METADATA;
    $args->{'metadata'}->{'class'} = $class;

    ## Here, we call the 'new' method for our base class
    ## This runs some additional magic and checking
    ## and returns our actual $self
    my $self = $class->SUPER::new($args);

    return $self;
}

sub intranet_head {
    my ($self) = @_;

    return q{<script src="/api/v1/contrib/commandpalette/static/assets/main.umd.js"></script>};

}

sub intranet_js {
    my ($self) = @_;

    return <<~"SCRIPT";
        <script>
            document.body.insertAdjacentHTML('beforeend', '<koha-command-palette></koha-command-palette>');
        </script>
    SCRIPT

}

sub configure {
    my ( $self, $args ) = @_;

    my $template = undef;
    my $cgi      = $self->{'cgi'};
    my $op       = $cgi->param('op') || q{};

    my $responses = {
        q{} => sub {
            $template = $self->get_template( { file => 'views/configuration/settings.tt' } );

            return $self->output_html( $template->output() );
        }

    };

    return $responses->{$op}();
}

sub install() {
    my ( $self, $args ) = @_;

    return try {
        my $dbh = C4::Context->dbh;

        my $table_names = { routes => $self->get_qualified_table_name('routes'), };

        # Read in the schema.sql file
        local $INPUT_RECORD_SEPARATOR = undef;    # Enable slurp mode

        # We have to go the manual route because $self->bundle_path is undef at this point
        my $file       = __FILE__;
        my $bundle_dir = $file;
        $bundle_dir =~ s/[.]pm$//smx;

        my $bundle_path = $bundle_dir;
        open my $fh, '<', $bundle_path . '/sql/schema.sql' or croak "Can't open schema.sql: $OS_ERROR";
        my $sql = <$fh>;
        close $fh or croak "Can't close schema.sql: $OS_ERROR";

        # Replace placeholder tokens with table names
        for my $table ( keys %{$table_names} ) {
            my $ws         = '\s*';                     # Whitespace character class
            my $ob         = '\{';                      # Opening brace character class
            my $cb         = '\}';                      # Closing brace character class
            my $table_name = '\s*' . $table . '\s*';    # Table name wrapped with optional whitespace

            my $pattern = $ob . $ws . $ob . $table_name . $cb . $ws . $cb;

            $sql =~ s/$pattern/$table_names->{$table}/smxg;
        }

        # Split statements and execute each one
        my $statements = [ split /;\s*\n/smx, $sql ];
        for my $statement ( @{$statements} ) {
            $dbh->do($statement);
        }

        return 1;
    }
    catch {
        my $error = $_;
        use Data::Dumper;
        carp Dumper($error);
        carp "INSTALL ERROR: $error";

        return 0;
    };
}

sub upgrade {
    my ( $self, $args ) = @_;

    my $dt = dt_from_string();
    $self->store_data( { last_upgraded => $dt->ymd(q{-}) . q{ } . $dt->hms(q{:}) } );

    return 1;
}

sub uninstall() {
    my ( $self, $args ) = @_;

    my $dbh = C4::Context->dbh;

    my @tables = qw(routes);
    for my $table (@tables) {
        my $stmt = 'DROP TABLE IF EXISTS ' . $self->get_qualified_table_name($table);
        $dbh->do($stmt);
    }

    return 1;
}

sub api_routes {
    my ( $self, $args ) = @_;

    my $spec_str = $self->mbf_read('openapi.json');
    my $spec     = decode_json($spec_str);

    return $spec;
}

sub api_namespace {
    my ($self) = @_;

    return 'commandpalette';
}

sub static_routes {
    my ( $self, $args ) = @_;

    my $spec_str = $self->mbf_read('staticapi.json');
    my $spec     = decode_json($spec_str);

    return $spec;
}

1;
