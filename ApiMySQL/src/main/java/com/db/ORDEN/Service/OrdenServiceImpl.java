package com.db.ORDEN.Service;

import com.db.ORDEN.Models.Orden;
import com.db.ORDEN.Repository.OrdenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrdenServiceImpl implements OrdenService {

    @Autowired
    private OrdenRepository ordenRepository;

    @Override
    public List<Orden> getAllOrdenes() {
        return ordenRepository.findAll();
    }

    @Override
    public Optional<Orden> getOrdenById(Integer id) {
        return ordenRepository.findById(id);
    }

    @Override
    public Orden saveOrUpdateOrden(Orden orden) {
        return (Orden) ordenRepository.save(orden);
    }

    @Override
    public void deleteOrdenById(Integer id) {
        ordenRepository.deleteById(id);
    }
}
