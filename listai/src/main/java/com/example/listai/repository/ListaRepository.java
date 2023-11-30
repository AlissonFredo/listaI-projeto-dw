package com.example.listai.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.listai.entity.Lista;

@Repository
public interface ListaRepository extends JpaRepository<Lista, Long> {

    List<Lista> findByUsuarioId(Long userId);

}
