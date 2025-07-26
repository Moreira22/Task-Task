package com.example.TaskBack.repository;
import com.example.TaskBack.domain.Comentario;
import com.example.TaskBack.service.DTO.ComentarioDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Integer>{
    @Query("SELECT NEW com.example.TaskBack.service.DTO.ComentarioDTO(" +
            "c.idComentario, c.conteudo, c.criadoEm, c.criado.idUsuario, c.tarefa.idTarefa) " +
            "FROM Comentario c")
    List<ComentarioDTO> listAll();
}
