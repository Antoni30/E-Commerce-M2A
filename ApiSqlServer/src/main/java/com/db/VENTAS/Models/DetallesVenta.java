package com.db.VENTAS.Models;

import jakarta.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "DETALLES_VENTA")
public class DetallesVenta implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_DETALLE_VENTA")
    private Integer idDetalleVenta;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "ID_DATOS_VENTA_FK", referencedColumnName = "ID_VENTA", nullable = false),
            @JoinColumn(name = "FECHA", referencedColumnName = "FECHA", nullable = false)
    })
    private DatosVenta datosVenta;

    @Column(name = "ID_PRODUCTO_FK", nullable = false)
    private Integer idProductoFk;

    @Column(name = "PRECIO_UNI_COMPRA", nullable = false, columnDefinition = "money")
    private BigDecimal precioUniCompra;

    @Column(name = "PRECIO_UNI_VENTA", nullable = false, columnDefinition = "money")
    private BigDecimal precioUniVenta;

    @Column(name = "CANTIDAD_VENTA", nullable = false)
    private Integer cantidadVenta;

    @Column(name = "IMPUESTO_VENTA", nullable = true, columnDefinition = "int default 12")
    private Integer impuestoVenta;

    @Column(name = "DESCUENTO_PROD_VENTA", nullable = true, columnDefinition = "int default 0")
    private Integer descuentoProdVenta;

    @Column(name = "TOTAL_PRECIO_COMPRA", nullable = false, columnDefinition = "money")
    private BigDecimal totalPrecioCompra;

    @Column(name = "TOTAL_DET_VENTA", nullable = false, columnDefinition = "money")
    private BigDecimal totalDetVenta;

    // Getters and Setters

    public Integer getIdDetalleVenta() {
        return idDetalleVenta;
    }

    public void setIdDetalleVenta(Integer idDetalleVenta) {
        this.idDetalleVenta = idDetalleVenta;
    }

    public DatosVenta getDatosVenta() {
        return datosVenta;
    }

    public void setDatosVenta(DatosVenta datosVenta) {
        this.datosVenta = datosVenta;
    }

    public Integer getIdProductoFk() {
        return idProductoFk;
    }

    public void setIdProductoFk(Integer idProductoFk) {
        this.idProductoFk = idProductoFk;
    }

    public BigDecimal getPrecioUniCompra() {
        return precioUniCompra;
    }

    public void setPrecioUniCompra(BigDecimal precioUniCompra) {
        this.precioUniCompra = precioUniCompra;
    }

    public BigDecimal getPrecioUniVenta() {
        return precioUniVenta;
    }

    public void setPrecioUniVenta(BigDecimal precioUniVenta) {
        this.precioUniVenta = precioUniVenta;
    }

    public Integer getCantidadVenta() {
        return cantidadVenta;
    }

    public void setCantidadVenta(Integer cantidadVenta) {
        this.cantidadVenta = cantidadVenta;
    }

    public Integer getImpuestoVenta() {
        return impuestoVenta;
    }

    public void setImpuestoVenta(Integer impuestoVenta) {
        this.impuestoVenta = impuestoVenta;
    }

    public Integer getDescuentoProdVenta() {
        return descuentoProdVenta;
    }

    public void setDescuentoProdVenta(Integer descuentoProdVenta) {
        this.descuentoProdVenta = descuentoProdVenta;
    }

    public BigDecimal getTotalPrecioCompra() {
        return totalPrecioCompra;
    }

    public void setTotalPrecioCompra(BigDecimal totalPrecioCompra) {
        this.totalPrecioCompra = totalPrecioCompra;
    }

    public BigDecimal getTotalDetVenta() {
        return totalDetVenta;
    }

    public void setTotalDetVenta(BigDecimal totalDetVenta) {
        this.totalDetVenta = totalDetVenta;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DetallesVenta that = (DetallesVenta) o;
        return Objects.equals(idDetalleVenta, that.idDetalleVenta);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idDetalleVenta);
    }
}
