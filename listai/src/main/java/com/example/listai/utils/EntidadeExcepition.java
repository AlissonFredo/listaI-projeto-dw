package com.example.listai.utils;

public class EntidadeExcepition extends RuntimeException {
    public EntidadeExcepition(String entidade, Long id) {
        super("A entidade " + entidade + " com o ID " + id + " não foi encontrada.");
    }
}
