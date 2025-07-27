package com.example.TaskBack.service;

import com.example.TaskBack.domain.Arquivo;
import com.example.TaskBack.repository.ArquivoRepository;
import com.example.TaskBack.service.DTO.ArquivoDTO;
import com.example.TaskBack.service.exception.EntityNotFoundException;
import com.example.TaskBack.service.mapper.ArquivoMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ArquivoService {
    private final ArquivoRepository repository;
    private final ArquivoMapper mapper;

    private Arquivo findEntity(Integer id) {
        return repository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Usuario Não Encontrado"));
    }

    public ArquivoDTO findByID(Integer id) {return mapper.toDto(findEntity(id));}

    public ArquivoDTO save(ArquivoDTO dto) {
        Arquivo arquivo = mapper.toEntity(dto);
        arquivo = repository.save(arquivo);
        return mapper.toDto(arquivo);
    }

    public List<ArquivoDTO> findAll() {return repository.listAll();}

    public void delete(Integer id) {
        Arquivo arquivo = findEntity(id);
        repository.delete(arquivo);
    }
}
