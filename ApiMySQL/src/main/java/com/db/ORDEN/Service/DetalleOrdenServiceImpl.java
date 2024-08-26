package com.db.ORDEN.Service;

import com.db.ORDEN.Models.DetalleOrden;
import com.db.ORDEN.Repository.DetalleOrdenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DetalleOrdenServiceImpl implements DetalleOrdenService {

    private final DetalleOrdenRepository detalleOrdenRepository;

    @Autowired
    public DetalleOrdenServiceImpl(DetalleOrdenRepository detalleOrdenRepository) {
        this.detalleOrdenRepository = detalleOrdenRepository;
    }

    @Override
    public DetalleOrden saveDetalleOrden(DetalleOrden detalleOrden) {
        return detalleOrdenRepository.save(detalleOrden);
    }

    @Override
    public DetalleOrden getDetalleOrdenById(Integer id) {
        Optional<DetalleOrden> detalleOrden = detalleOrdenRepository.findById(id);
        return detalleOrden.orElse(null);
    }

    @Override
    public List<DetalleOrden> getAllDetalleOrden() {
        return detalleOrdenRepository.findAll();
    }

    @Override
    public void deleteDetalleOrden(Integer id) {
        detalleOrdenRepository.deleteById(id);
    }
}
