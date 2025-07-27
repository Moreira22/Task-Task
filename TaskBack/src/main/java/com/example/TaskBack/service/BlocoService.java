package com.example.TaskBack.service;

import com.example.TaskBack.domain.Bloco;
import com.example.TaskBack.repository.BlocoRepository;
import com.example.TaskBack.service.DTO.BlocoDTO;
import com.example.TaskBack.service.exception.EntityNotFoundException;
import com.example.TaskBack.service.mapper.BlocoMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class BlocoService {
    private final BlocoRepository repository;
    private final BlocoMapper mapper;

    private Bloco findEntity(Integer id) {
        return repository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Grupo Não Encontrado"));
    }

    public BlocoDTO findByID(Integer id) {return mapper.toDto(findEntity(id));}

    public BlocoDTO save(BlocoDTO dto) {
        Bloco bloco = mapper.toEntity(dto);
        bloco = repository.save(bloco);
        return mapper.toDto(bloco);
    }

    public List<BlocoDTO> findAll() {return repository.listAll();}

    public void delete(Integer id) {
        Bloco bloco = findEntity(id);
        repository.delete(bloco);
    }
}
