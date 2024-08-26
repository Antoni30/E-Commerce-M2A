package com.db.ORDEN.Models;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "DATOS_ORDEN")
public class Orden {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_ORDEN")
    private Integer idOrden;

    @Column(name = "ID_CLIENTE_FK", nullable = false)
    private Integer idClienteFk;

    @Column(name = "TOTAL_VALOR_ORDEN")
    private BigDecimal totalValorOrden;

    @Column(name = "FECHA_ORDEN", nullable = false)
    private LocalDate fechaOrden;

    // Getters and Setters
    public Integer getIdOrden() {
        return idOrden;
    }

    public void setIdOrden(Integer idOrden) {
        this.idOrden = idOrden;
    }

    public Integer getIdClienteFk() {
        return idClienteFk;
    }

    public void setIdClienteFk(Integer idClienteFk) {
        this.idClienteFk = idClienteFk;
    }

    public BigDecimal getTotalValorOrden() {
        return totalValorOrden;
    }

    public void setTotalValorOrden(BigDecimal totalValorOrden) {
        this.totalValorOrden = totalValorOrden;
    }

    public LocalDate getFechaOrden() {
        return fechaOrden;
    }

    public void setFechaOrden(LocalDate fechaOrden) {
        this.fechaOrden = fechaOrden;
    }

    @Override
    public String toString() {
        return "Orden{" +
                "idOrden=" + idOrden +
                ", idClienteFk=" + idClienteFk +
                ", totalValorOrden=" + totalValorOrden +
                ", fechaOrden=" + fechaOrden +
                '}';
    }
}

