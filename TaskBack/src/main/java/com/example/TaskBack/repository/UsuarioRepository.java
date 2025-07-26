package com.example.TaskBack.repository;

import com.example.TaskBack.domain.Usuario;
import com.example.TaskBack.service.DTO.UsuarioDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{
    @Query("SELECT NEW com.example.TaskBack.service.DTO.UsuarioDTO(" +
            "u.idUsuario, u.nome, u.email ) " +
            "FROM Usuario u")
    List<UsuarioDTO> listAll();
}
