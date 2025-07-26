package com.example.TaskBack.service.mapper;

import com.example.TaskBack.domain.Bloco;
import com.example.TaskBack.service.DTO.BlocoDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BlocoMapper extends EntityMapper<BlocoDTO, Bloco> {
    @Override
    @Mapping(source = "grupo.idGrupo", target = "grupo")
    @Mapping(source = "criadoPor.idUsuario", target = "criadoPor")
    BlocoDTO toDto(Bloco entity);

    @Override
    @InheritInverseConfiguration
    @Mapping(source = "grupo", target = "grupo.idGrupo")
    @Mapping(source = "criadoPor", target = "criadoPor.idUsuario")
    Bloco toEntity(BlocoDTO dto);
}
