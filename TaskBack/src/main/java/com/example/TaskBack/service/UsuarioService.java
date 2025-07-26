package com.example.TaskBack.service;

import com.example.TaskBack.domain.Usuario;
import com.example.TaskBack.repository.UsuarioRepository;
import com.example.TaskBack.service.DTO.UsuarioDTO;
import com.example.TaskBack.service.exception.EntityNotFoundException;
import com.example.TaskBack.service.mapper.UsuarioMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UsuarioService {
    private final UsuarioRepository repository;
    private final UsuarioMapper mapper;

    private Usuario findEntity(Integer id) {
        return repository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Usuario Não Encontrado"));
    }

    public UsuarioDTO findByID(Integer id) {return mapper.toDto(findEntity(id));}

    public UsuarioDTO save(UsuarioDTO bebidaDTO) {
        Usuario usuario = mapper.toEntity(bebidaDTO);
        usuario = repository.save(usuario);
        return mapper.toDto(usuario);
    }

    public List<UsuarioDTO> findAll() {return repository.listAll();}

    public void delete(Integer id) {
        Usuario usuario = findEntity(id);
        repository.delete(usuario);
    }
}
