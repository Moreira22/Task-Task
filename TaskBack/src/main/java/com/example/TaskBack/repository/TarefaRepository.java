package com.example.TaskBack.repository;
import com.example.TaskBack.domain.Tarefa;
import com.example.TaskBack.service.DTO.TarefaDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, Integer>{
    @Query("SELECT NEW com.example.TaskBack.service.DTO.TarefaDTO(" +
            "t.idTarefa, t.descricao, t.titulo, t.criadoPor.idUsuario, t.bloco.idBloco ) " +
            "FROM Tarefa t")
    List<TarefaDTO> listAll();
}
