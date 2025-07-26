package com.example.TaskBack.service.mapper;

import com.example.TaskBack.domain.Comentario;
import com.example.TaskBack.service.DTO.ComentarioDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ComentarioMapper extends EntityMapper<ComentarioDTO, Comentario>{
    @Override
    @Mapping(source = "criado.idUsuario", target = "criado")
    @Mapping(source = "tarefa.idTarefa", target = "tarefa")
    ComentarioDTO toDto(Comentario entity);

    @Override
    @InheritInverseConfiguration
    @Mapping(source = "criado", target = "criado.idUsuario")
    @Mapping(source = "tarefa", target = "tarefa.idTarefa")
    Comentario toEntity(ComentarioDTO dto);
}
