package com.example.TaskBack.service.mapper;

import com.example.TaskBack.domain.Grupo;
import com.example.TaskBack.service.DTO.GrupoDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface GrupoMapper extends EntityMapper<GrupoDTO, Grupo>{
    @Override
    @Mapping(source = "usuarios.idUsuario", target = "usuarios")
    GrupoDTO toDto(Grupo entity);

    @Override
    @InheritInverseConfiguration
    @Mapping(source = "usuarios", target = "usuarios.idUsuario")
    Grupo toEntity(GrupoDTO dto);
}
