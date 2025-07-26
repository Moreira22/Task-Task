package com.example.TaskBack.repository;
import com.example.TaskBack.domain.Arquivo;
import com.example.TaskBack.service.DTO.ArquivoDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArquivoRepository extends JpaRepository<Arquivo, Integer>{
    @Query("SELECT NEW com.example.TaskBack.service.DTO.ArquivoDTO(" +
            "a.idArquivo, a.nomeArquivo, a.caminho, a.tarefa.idTarefa, a.enviadoPor.idUsuario)" +
            "FROM Arquivo a")
    List<ArquivoDTO> listAll();
}
