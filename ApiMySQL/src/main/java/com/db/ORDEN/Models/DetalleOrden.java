package com.db.ORDEN.Models;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "DETALLE_ORDEN")
public class DetalleOrden {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_DETALLE_ORDEN")
    private Integer idDetalleOrden;

    @ManyToOne
    @JoinColumn(name = "ID_DATOS_ORDEN_FK")
    private Orden datosOrden;

    @Column(name = "PRECIO_UNI_ORDEN", nullable = false)
    private BigDecimal precioUniOrden;

    @Column(name = "ID_PRODUCTO_FK", nullable = false)
    private Integer idProductoFk;

    @Column(name = "CANTIDAD_PROD_ORDEN", nullable = false)
    private Integer cantidadProdOrden;

    @Column(name = "TOTAL_DET_ORDEN", nullable = false)
    private BigDecimal totalDetOrden;

    // Getters and Setters
    public Integer getIdDetalleOrden() {
        return idDetalleOrden;
    }

    public void setIdDetalleOrden(Integer idDetalleOrden) {
        this.idDetalleOrden = idDetalleOrden;
    }

    public Orden getDatosOrden() {
        return datosOrden;
    }

    public void setDatosOrden(Orden datosOrden) {
        this.datosOrden = datosOrden;
    }

    public BigDecimal getPrecioUniOrden() {
        return precioUniOrden;
    }

    public void setPrecioUniOrden(BigDecimal precioUniOrden) {
        this.precioUniOrden = precioUniOrden;
    }

    public Integer getIdProductoFk() {
        return idProductoFk;
    }

    public void setIdProductoFk(Integer idProductoFk) {
        this.idProductoFk = idProductoFk;
    }

    public Integer getCantidadProdOrden() {
        return cantidadProdOrden;
    }

    public void setCantidadProdOrden(Integer cantidadProdOrden) {
        this.cantidadProdOrden = cantidadProdOrden;
    }

    public BigDecimal getTotalDetOrden() {
        return totalDetOrden;
    }

    public void setTotalDetOrden(BigDecimal totalDetOrden) {
        this.totalDetOrden = totalDetOrden;
    }
}
