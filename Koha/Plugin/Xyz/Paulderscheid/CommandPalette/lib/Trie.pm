package Koha::Plugin::Xyz::Paulderscheid::CommandPalette::lib::Trie;

use Modern::Perl;
use utf8;
use 5.032;

use Moose;
use Koha::Plugin::Xyz::Paulderscheid::CommandPalette::lib::TrieNode;

our $VERSION = '1.0.0';

has 'root' => (
    is      => 'ro',
    isa     => 'Koha::Plugin::Xyz::Paulderscheid::CommandPalette::lib::TrieNode',
    default => sub { return Koha::Plugin::Xyz::Paulderscheid::CommandPalette::lib::TrieNode->new() },
);

sub insert {
    my ( $self, $path ) = @_;
    my @components = split /\//smx, $path;
    my $node       = $self->root;
    foreach my $component (@components) {
        if ( !$node->children->{$component} ) {
            $node->children->{$component} = Koha::Plugin::Xyz::Paulderscheid::CommandPalette::lib::TrieNode->new();
        }
        $node = $node->children->{$component};
    }
    $node->is_end_of_path(1);

    return;
}

sub search {
    my ( $self, $substring ) = @_;
    my @matches;
    my @stack;
    push @stack, [ $self->root, q{} ];

    while (@stack) {
        my $node_path = pop @stack;
        my $node      = $node_path->[0];
        my $path      = $node_path->[1];

        if ( $node->is_end_of_path && $path =~ /$substring/smx ) {
            push @matches, "/$path";
        }

        foreach my $component ( keys %{ $node->children } ) {
            my $child_node = $node->children->{$component};
            my $child_path = $path eq q{} ? $component : "$path/$component";

            push @stack, [ $child_node, $child_path ];
        }
    }

    return @matches;
}

sub collect_paths {
    my ( $self, $node ) = @_;
    my @paths;
    if ( $node->is_end_of_path ) {
        push @paths, $node->path;    # Store the full path associated with the node
    }
    foreach my $child_node ( values %{ $node->children } ) {
        push @paths, $self->collect_paths($child_node);
    }
    return @paths;
}

1;
