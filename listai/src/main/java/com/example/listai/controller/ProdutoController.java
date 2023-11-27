package com.example.listai.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.listai.repository.ProdutoRepository;
import com.example.listai.utils.EntidadeExcepition;
import com.example.listai.entity.Produto;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {
    @Autowired
    private ProdutoRepository produtoRepository;

    @GetMapping("/all")
    public List<Produto> all() {
        return produtoRepository.findAll();
    }

    @GetMapping("/show/{id}")
    public Produto show(@PathVariable Long id) {
        Produto produto = produtoRepository.findById(id).orElse(null);
        return produto;
    }

    @PostMapping
    public Produto create(@RequestBody Produto produto) {
        return produtoRepository.save(produto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Produto produto) {
        Produto currentProduto = produtoRepository.findById(id)
                .orElseThrow(() -> new EntidadeExcepition("Produto", id));

        if (currentProduto.getId() != null) {
            produto.setId(id);
            currentProduto = produtoRepository.save(produto);
        }

        return ResponseEntity.ok(currentProduto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluirProduto(@PathVariable Long id) {
        Produto produto = produtoRepository.findById(id).orElseThrow(() -> new EntidadeExcepition("Produto", id));

        if (produto.getId() != null) {
            produtoRepository.deleteById(id);
        }

        return ResponseEntity.ok(produto);
    }

    @ExceptionHandler(EntidadeExcepition.class)
    public ResponseEntity<String> handleEntidadeNaoEncontrada(EntidadeExcepition e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
}
