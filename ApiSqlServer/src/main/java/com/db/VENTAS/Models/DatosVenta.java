package com.db.VENTAS.Models;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "DATOS_VENTA")
public class DatosVenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_VENTA")
    private Integer idVenta;

    @Column(name = "FECHA", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date fecha;

    @Column(name = "ID_ORDEN_FK", nullable = false)
    private Integer idOrdenFk;

    @Column(name = "CODIGO_VENTA", length = 500, nullable = false)
    private String codigoVenta;

    @Column(name = "DESCUENTO_TOTAL_VENTA", nullable = true, columnDefinition = "int default 0")
    private Integer descuentoTotalVenta;

    @Column(name = "SUB_TOTAL_SIN_IMP_VENTA", nullable = true, columnDefinition = "money default 0")
    private BigDecimal subTotalSinImpVenta;

    @Column(name = "PRECIO_TOTAL", nullable = true, columnDefinition = "money default 0")
    private BigDecimal precioTotal;

    // Getters and Setters
    public Integer getIdVenta() {
        return idVenta;
    }

    public void setIdVenta(Integer idVenta) {
        this.idVenta = idVenta;
    }

    public Integer getIdOrdenFk() {
        return idOrdenFk;
    }

    public void setIdOrdenFk(Integer idOrdenFk) {
        this.idOrdenFk = idOrdenFk;
    }

    public String getCodigoVenta() {
        return codigoVenta;
    }

    public void setCodigoVenta(String codigoVenta) {
        this.codigoVenta = codigoVenta;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public Integer getDescuentoTotalVenta() {
        return descuentoTotalVenta;
    }

    public void setDescuentoTotalVenta(Integer descuentoTotalVenta) {
        this.descuentoTotalVenta = descuentoTotalVenta;
    }

    public BigDecimal getSubTotalSinImpVenta() {
        return subTotalSinImpVenta;
    }

    public void setSubTotalSinImpVenta(BigDecimal subTotalSinImpVenta) {
        this.subTotalSinImpVenta = subTotalSinImpVenta;
    }

    public BigDecimal getPrecioTotal() {
        return precioTotal;
    }

    public void setPrecioTotal(BigDecimal precioTotal) {
        this.precioTotal = precioTotal;
    }
}
