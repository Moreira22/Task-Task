package com.example.TaskBack.service;

import com.example.TaskBack.domain.Tarefa;
import com.example.TaskBack.repository.TarefaRepository;
import com.example.TaskBack.service.DTO.TarefaDTO;
import com.example.TaskBack.service.exception.EntityNotFoundException;
import com.example.TaskBack.service.mapper.TarefaMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class TarefaService {
    private final TarefaRepository repository;
    private final TarefaMapper mapper;

    private Tarefa findEntity(Integer id) {
        return repository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Tarefa Não Encontrado"));
    }

    public TarefaDTO findByID(Integer id) {return mapper.toDto(findEntity(id));}

    public TarefaDTO save(TarefaDTO dto) {
        Tarefa tarefa = mapper.toEntity(dto);
        tarefa = repository.save(tarefa);
        return mapper.toDto(tarefa);
    }

    public List<TarefaDTO> findAll() {return repository.listAll();}

    public void delete(Integer id) {
        Tarefa tarefa = findEntity(id);
        repository.delete(tarefa);
    }
}
