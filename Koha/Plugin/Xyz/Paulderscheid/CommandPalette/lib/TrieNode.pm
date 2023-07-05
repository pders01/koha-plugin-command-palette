package Koha::Plugin::Xyz::Paulderscheid::CommandPalette::lib::TrieNode;

use Modern::Perl;
use utf8;
use 5.032;

use Moose;

our $VERSION = '1.0.0';

has 'children' => (
    is      => 'ro',
    isa     => 'HashRef[TrieNode]',
    default => sub { return {} },
);

has 'is_end_of_path' => (
    is      => 'rw',
    isa     => 'Bool',
    default => 0,
);

1;
