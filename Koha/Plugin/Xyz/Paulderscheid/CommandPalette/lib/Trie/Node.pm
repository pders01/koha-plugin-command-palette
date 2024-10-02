package Trie::Node;

use strict;
use warnings;
use utf8;
use 5.032;

use Moo;

use Carp qw( croak );

our $VERSION = '1.0.0';

has 'children' => (
    is      => 'ro',
    isa     => sub { croak 'Invalid children data type. Must be a HashRef.' if ( !( ref $_[0] eq 'HASH' ) ) },
    default => sub { return {} },
);

has 'is_end_of_path' => (
    is      => 'rw',
    isa     => sub { croak 'is_end_of_path must be a Boolean value.' if ( !( $_[0] == 0 || $_[0] == 1 ) ) },
    default => 0,
);

sub add_child {
    my ( $self, $key ) = @_;
    $self->children->{$key} = Trie::Node->new;
    return;
}

sub has_child {
    my ( $self, $key ) = @_;
    return exists $self->children->{$key};
}

sub get_child {
    my ( $self, $key ) = @_;
    return $self->children->{$key};
}

sub get_child_keys {
    my ($self) = @_;
    return keys %{ $self->children };
}

sub get_children {
    my ($self) = @_;
    return values %{ $self->children };
}

__PACKAGE__->meta->make_immutable;

1;
