package com.example.TaskBack.service.mapper;


import com.example.TaskBack.domain.Tarefa;
import com.example.TaskBack.service.DTO.TarefaDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TarefaMapper extends EntityMapper<TarefaDTO, Tarefa> {
    @Override
    @Mapping(source = "bloco.idBloco", target = "bloco")
    @Mapping(source = "criadoPor.idUsuario", target = "criadoPor")
    TarefaDTO toDto(Tarefa entity);

    @Override
    @InheritInverseConfiguration
    @Mapping(source = "bloco", target = "bloco.idBloco")
    @Mapping(source = "criadoPor", target = "criadoPor.idUsuario")
    Tarefa toEntity(TarefaDTO dto);
}
