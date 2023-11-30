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
import com.example.listai.repository.UserRepository;
import com.example.listai.utils.EntidadeExcepition;
import com.example.listai.dto.ListaDto;
import com.example.listai.entity.Lista;
import com.example.listai.entity.User;

@RestController
@RequestMapping("/lista")
public class ListaController {
    @Autowired
    private ListaRepository listaRepository;

    @Autowired
    private UserRepository userRepository;

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
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody ListaDto listaDto) {
        try {
            Lista listaToUpdate = listaRepository.findById(id)
                    .orElseThrow(() -> new EntidadeExcepition("Lista", id));

            if (listaToUpdate != null) {
                User usuario = userRepository.findUserById(listaDto.getUsuarioId());

                if (usuario != null) {
                    listaToUpdate.setNome(listaDto.getNome());

                    Lista updatedLista = listaRepository.save(listaToUpdate);

                    return ResponseEntity.ok(updatedLista);
                } else {
                    return ResponseEntity.notFound().build();
                }
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (EntidadeExcepition ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
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
