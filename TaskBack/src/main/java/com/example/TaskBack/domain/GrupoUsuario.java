package com.example.TaskBack.domain;
import com.example.TaskBack.domain.pk.GrupoUsuarioPK;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(schema = "Task", name = "grupo_usuario")

public class GrupoUsuario implements Serializable{
    @EmbeddedId
    private GrupoUsuarioPK id;

    @MapsId("usuarioId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "usuario_id", referencedColumnName = "IdUsuario")
    private Usuario usuario;

    @MapsId("grupoId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "grupo_id", referencedColumnName = "IdGrupo")
    private Grupo grupo;
}
