package com.example.TaskBack.service.mapper;

import com.example.TaskBack.domain.GrupoUsuario;
import com.example.TaskBack.service.DTO.GrupoUsuarioDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface GrupoUsuarioMapper extends EntityMapper<GrupoUsuarioDTO, GrupoUsuario>{

    @Override
    @Mapping(source = "usuario.idUsuario", target = "usuario")
    @Mapping(source = "grupo.idGrupo", target = "grupo")
    GrupoUsuarioDTO toDto(GrupoUsuario entity);

    @Override
    @InheritInverseConfiguration
    @Mapping(source = "usuario", target = "usuario.idUsuario")
    @Mapping(source = "grupo", target = "grupo.idGrupo")
    GrupoUsuario toEntity(GrupoUsuarioDTO dto);
}
