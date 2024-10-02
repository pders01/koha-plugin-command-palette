package Trie;

use strict;
use warnings;
use utf8;

use Moo;

use Cwd            qw( abs_path );
use File::Basename qw( dirname );

use lib dirname( abs_path(__FILE__) );

use Trie::Node;

our $VERSION = '1.0.0';

has 'root' => (
    is      => 'ro',
    default => sub { Trie::Node->new },
);

sub insert {
    my ( $self, $path ) = @_;
    my @components = split /\//smx, $path;
    my $node       = $self->root;

    foreach my $component (@components) {
        if ( !$node->has_child($component) ) {
            $node->add_child($component);
        }
        $node = $node->get_child($component);
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
        my ( $node, $path ) = @{ pop @stack };

        if ( $node->is_end_of_path && index( $path, $substring ) >= 0 ) {
            push @matches, "/$path";
        }

        foreach my $component ( $node->get_child_keys ) {
            my $child_node = $node->get_child($component);
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
        push @paths, $node->get_path;
    }

    foreach my $child_node ( $node->get_children ) {
        push @paths, $self->collect_paths($child_node);
    }

    return @paths;
}

__PACKAGE__->meta->make_immutable;

1;
