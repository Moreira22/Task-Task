package com.example.TaskBack.service.mapper;

import com.example.TaskBack.domain.Usuario;
import com.example.TaskBack.service.DTO.UsuarioDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UsuarioMapper extends EntityMapper<UsuarioDTO, Usuario> {
}
