package com.example.listai.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import com.example.listai.dto.ProdutoDto;
import com.example.listai.entity.Lista;
import com.example.listai.entity.Produto;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {
    @Autowired
    private ProdutoRepository produtoRepository;

    @CrossOrigin
    @GetMapping("/all")
    public List<Produto> all() {
        return produtoRepository.findAll();
    }

    @CrossOrigin
    @GetMapping("/show/{id}")
    public Produto show(@PathVariable Long id) {
        Produto produto = produtoRepository.findById(id).orElse(null);
        return produto;
    }

    @CrossOrigin
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody ProdutoDto produtoDto) {
        try {
            Lista lista = new Lista();
            lista.setId(produtoDto.getListaId());

            Produto produto = new Produto();
            produto.setNome(produtoDto.getNome());
            produto.setCategoria(produtoDto.getCategoria());
            produto.setLista(lista);

            Produto createdProduto = produtoRepository.save(produto);

            if (createdProduto != null) {
                return ResponseEntity.ok(createdProduto);
            } else {
                return ResponseEntity
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @CrossOrigin
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

    @CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluirProduto(@PathVariable Long id) {
        Produto produto = produtoRepository
                .findById(id)
                .orElseThrow(() -> new EntidadeExcepition("Produto", id));

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
