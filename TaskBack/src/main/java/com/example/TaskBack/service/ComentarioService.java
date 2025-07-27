package com.example.TaskBack.service;

import com.example.TaskBack.domain.Comentario;
import com.example.TaskBack.repository.ComentarioRepository;
import com.example.TaskBack.service.DTO.ComentarioDTO;
import com.example.TaskBack.service.exception.EntityNotFoundException;
import com.example.TaskBack.service.mapper.ComentarioMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ComentarioService {
    private final ComentarioRepository repository;
    private final ComentarioMapper mapper;

    private Comentario findEntity(Integer id) {
        return repository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Cementario Não Encontrado"));
    }

    public ComentarioDTO findByID(Integer id) {return mapper.toDto(findEntity(id));}

    public ComentarioDTO save(ComentarioDTO dto) {
        Comentario comentario = mapper.toEntity(dto);
        comentario = repository.save(comentario);
        return mapper.toDto(comentario);
    }

    public List<ComentarioDTO> findAll() {return repository.listAll();}

    public void delete(Integer id) {
        Comentario comentario = findEntity(id);
        repository.delete(comentario);
    }
}
