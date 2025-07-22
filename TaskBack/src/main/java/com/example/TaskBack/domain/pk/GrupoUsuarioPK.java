package com.example.TaskBack.domain.pk;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class GrupoUsuarioPK implements Serializable {
    @Column(name = "usuario_id", nullable = false)
    private Long usuarioId;

    @Column(name = "grupo_id", nullable = false)
    private Long grupoId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof GrupoUsuarioPK)) return false;
        GrupoUsuarioPK that = (GrupoUsuarioPK) o;
        return usuarioId.equals(that.usuarioId) && grupoId.equals(that.grupoId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(usuarioId, grupoId);
    }

}
