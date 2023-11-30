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

import com.example.listai.repository.ListaRepository;
import com.example.listai.utils.EntidadeExcepition;
import com.example.listai.dto.ListaDto;
import com.example.listai.entity.Lista;
import com.example.listai.entity.User;

@RestController
@RequestMapping("/lista")
public class ListaController {
    @Autowired
    private ListaRepository listaRepository;

    @CrossOrigin
    @GetMapping("/all/{userId}")
    public ResponseEntity<?> all(@PathVariable Long userId) {
        try {
            List<Lista> listas = listaRepository.findByUsuarioId(userId);

            if (!listas.isEmpty()) {
                return ResponseEntity.ok(listas);
            } else {
                return ResponseEntity.noContent().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @CrossOrigin
    @GetMapping("/show/{id}")
    public Lista show(@PathVariable Long id) {
        Lista lista = listaRepository.findById(id).orElse(null);
        return lista;
    }

    @CrossOrigin
    @PostMapping("create")
    public ResponseEntity<?> create(@RequestBody ListaDto listaDto) {
        try {
            User usuario = new User();
            usuario.setId(listaDto.getUsuarioId());

            Lista lista = new Lista();
            lista.setNome(listaDto.getNome());
            lista.setDataCriacao(listaDto.getDataCriacao());
            lista.setUsuario(usuario);

            Lista createdLista = listaRepository.save(lista);

            if (createdLista != null) {
                return ResponseEntity.ok(createdLista);
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
    @PutMapping("/id")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody ListaDto listaDto) {
        Lista currentLista = listaRepository
                .findById(id)
                .orElseThrow(() -> new EntidadeExcepition("Lista", id));

        if (currentLista.getId() != null) {
            Lista lista = new Lista();
            lista.setId(id);
            lista.setNome(listaDto.getNome());
            currentLista = listaRepository.save(lista);
        }

        return ResponseEntity.ok(currentLista);
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluirLista(@PathVariable Long id) {
        Lista lista = listaRepository
                .findById(id)
                .orElseThrow(() -> new EntidadeExcepition("Lista", id));

        if (lista.getId() != null) {
            listaRepository.deleteById(id);
        }

        return ResponseEntity.ok(lista);
    }

    @ExceptionHandler(EntidadeExcepition.class)
    public ResponseEntity<String> handleEntidadeNaoEncontrada(EntidadeExcepition e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
}
