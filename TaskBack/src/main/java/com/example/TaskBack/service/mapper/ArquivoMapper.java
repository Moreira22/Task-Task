package com.example.TaskBack.service.mapper;

import com.example.TaskBack.domain.Arquivo;
import com.example.TaskBack.service.DTO.ArquivoDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ArquivoMapper extends EntityMapper<ArquivoDTO, Arquivo>{
    @Override
    @Mapping(source = "enviadoPor.idUsuario", target = "enviadoPor")
    @Mapping(source = "tarefa.idTarefa", target = "tarefa")
    ArquivoDTO toDto(Arquivo entity);

    @Override
    @InheritInverseConfiguration
    @Mapping(source = "enviadoPor", target = "enviadoPor.idUsuario")
    @Mapping(source = "tarefa", target = "tarefa.idTarefa")
    Arquivo toEntity(ArquivoDTO dto);
}
