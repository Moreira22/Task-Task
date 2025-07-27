package com.example.TaskBack.service;

import java.util.List;

import com.example.TaskBack.domain.Grupo;
import com.example.TaskBack.service.DTO.GrupoDTO;
import com.example.TaskBack.service.exception.EntityNotFoundException;
import com.example.TaskBack.repository.GrupoRepository;
import com.example.TaskBack.service.mapper.GrupoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class GrupoService {
    private final GrupoRepository repository;
    private final GrupoMapper mapper;

    private Grupo findEntity(Integer id) {
        return repository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Grupo Não Encontrado"));
    }

    public GrupoDTO findByID(Integer id) {return mapper.toDto(findEntity(id));}

    public GrupoDTO save(GrupoDTO dto) {
        Grupo grupo = mapper.toEntity(dto);
        grupo = repository.save(grupo);
        return mapper.toDto(grupo);
    }

    public List<GrupoDTO> findAll() {return repository.listAll();}

    public void delete(Integer id) {
        Grupo grupo = findEntity(id);
        repository.delete(grupo);
    }
}
