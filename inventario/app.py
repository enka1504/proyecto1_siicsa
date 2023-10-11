from flask import Flask, send_file, jsonify, request
from psycopg2 import connect, extras

app = Flask(__name__)

host = 'localhost'
port = 5432
dbname = 'inventario'
user = 'postgres'
password = '12345678'


def get_connection():
    conn = connect(host=host, port=port, dbname=dbname,
                   user=user, password=password)
    return conn


#  MOSTRAR ÁREAS  #
@app.get('/api/areas')
def get_areas():
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('SELECT * FROM areas')
    area = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(area)


#  EQUIPO MULTIMEDIA  #
@app.get('/api/multimedias')
def get_multimedias():
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('SELECT * FROM areas as a, multimedia as m WHERE m.id_area = a.id')
    multimedia = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(multimedia)

@app.get('/api/multimedias/count')
def get_countmultimedias():
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('SELECT count(*) FROM multimedia')
    countmultimedia = cur.fetchone()
    cur.close()
    conn.close()
    return jsonify(countmultimedia)

@app.post('/api/multimedias')
def post_multimedia():
    new_multimedia = request.get_json()
    tipo = new_multimedia['tipo']
    modelo = new_multimedia['modelo']
    serie = new_multimedia['serie']
    descripcion = new_multimedia['descripcion']
    fecha_adquisicion = new_multimedia['fecha_adquisicion']
    estado = new_multimedia['estado']
    ubicacion = new_multimedia['ubicacion']
    especificaciones = new_multimedia['especificaciones']
    fecha_mantenimiento = new_multimedia['fecha_mantenimiento']
    id_area = new_multimedia['id_area']
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('INSERT INTO multimedia (tipo, modelo, serie, descripcion, fecha_adquisicion, estado, ubicacion, especificaciones, fecha_mantenimiento, id_area) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING *',
                (tipo, modelo, serie, descripcion, fecha_adquisicion, estado, ubicacion, especificaciones, fecha_mantenimiento, id_area))
    new_create_multimedia = cur.fetchone()
    print(new_create_multimedia)
    conn.commit()
    cur.close()
    conn.close()
    return jsonify(new_create_multimedia)

@app.delete('/api/multimedias/eliminar/<id>')
def delete_multimedia(id):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('DELETE FROM multimedia WHERE id = %s RETURNING *', (id,))
    multimedia = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()

    if multimedia is None:
        return jsonify({'message': 'Multimedia not found'}), 404
    return jsonify(multimedia)

@app.put('/api/multimedias/editar/<id>')
def update_multimedia(id):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    new_multimedia = request.get_json()
    tipo = new_multimedia['id_tipo']
    modelo = new_multimedia['modelo']
    serie = new_multimedia['serie']
    descripcion = new_multimedia['descripcion']
    fecha_adquisicion = new_multimedia['fecha_adquisicion']
    estado = new_multimedia['estado']
    ubicacion = new_multimedia['ubicacion']
    especificaciones = new_multimedia['especificaciones']
    fecha_mantenimiento = new_multimedia['fecha_mantenimiento']
    id_area = new_multimedia['id_area']
    cur.execute('UPDATE multimedia SET tipo = %s, modelo = %s, serie = %s, descripcion = %s , fecha_adquisicion = %s, estado = %s, ubicacion = %s, especificaciones = %s, fecha_mantenimiento = %s, id_area = %s WHERE id = %s RETURNING *',
                (tipo, modelo, serie, descripcion, fecha_adquisicion, estado, ubicacion, especificaciones, fecha_mantenimiento, id_area, id,))
    updated_mobiliario = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    if updated_mobiliario is None:
        return jsonify({'message': 'Mobiliario not found'}), 404
    return jsonify(updated_mobiliario)

@app.get('/api/multimedias/<id>')
def get_multimedia(id):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('SELECT * FROM areas as a, multimedia as m WHERE m.id = %s AND m.id_area = a.id', (id,))
    multimedia = cur.fetchone()
    if multimedia is None:
        return jsonify({'message': 'Multimedia not found'}), 404
    return jsonify(multimedia)

@app.get('/api/multimedias/tipo/<tipo>')
def get_multimediatipo(tipo):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('SELECT * FROM areas as a, multimedia as m WHERE m.tipo = %s AND m.id_area = a.id', (tipo,))
    multimedia = cur.fetchall()
    return jsonify(multimedia)

@app.get('/api/multimedias/area/<id_area>')
def get_multimediarea(id_area):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('SELECT * FROM areas as a, multimedia as m WHERE m.id_area = %s AND m.id_area = a.id', (id_area,))
    multimedia = cur.fetchall()
    return jsonify(multimedia)

@app.get('/api/multimedias/tipoyarea/<tipo>/<id_area>')
def get_multimediatipoyarea(tipo, id_area):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('SELECT * FROM areas as a, multimedia as m WHERE m.tipo = %s AND m.id_area = %s AND m.id_area = a.id', (tipo, id_area,))
    multimedia = cur.fetchall()
    if multimedia is None:
        return jsonify({'message': 'Equipo not found'}), 404
    return jsonify(multimedia)


#  EQUIPO DE LABORATORIO  #
@app.get('/api/equipos_lab')
def get_equipos():
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('SELECT * FROM areas as a, equipos_lab as e WHERE e.id_area = a.id')
    equipos = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(equipos)

@app.get('/api/equipos_lab/count')
def get_countequipos():
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('SELECT count(*) FROM equipos_lab')
    countequipos = cur.fetchone()
    cur.close()
    conn.close()
    return jsonify(countequipos)

@app.post('/api/equipos_lab')
def post_equipo():
    new_equipo = request.get_json()
    nombre = new_equipo['nombre']
    modelo = new_equipo['modelo']
    serie = new_equipo['serie']
    ubicacion = new_equipo['ubicacion']
    tipo_mantenimiento = new_equipo['tipo_mantenimiento']
    alcance_medicion = new_equipo['alcance_medicion']
    resolucion = new_equipo['resolucion']
    incertidumbre = new_equipo['incertidumbre']
    id_area = new_equipo['id_area']
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('INSERT INTO equipos_lab (nombre, modelo, serie, ubicacion, tipo_mantenimiento, alcance_medicion, resolucion, incertidumbre, id_area) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING *',
                (nombre, modelo, serie, ubicacion, tipo_mantenimiento, alcance_medicion, resolucion, incertidumbre, id_area))
    new_create_equipo = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    return jsonify(new_create_equipo)

@app.delete('/api/equipos_lab/eliminar/<id>')
def delete_equipo(id):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('DELETE FROM equipos_lab WHERE id = %s RETURNING *', (id,))
    equipo = cur.fetchone()
    conn.commit()
    conn.close()
    cur.close()
    if equipo is None:
        return jsonify({'message': 'Equipo not found'}), 404
    return jsonify(equipo)

@app.put('/api/equipos_lab/editar/<id>')
def update_equipo(id):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    new_equipo = request.get_json()
    nombre = new_equipo['nombre']
    modelo = new_equipo['modelo']
    serie = new_equipo['serie']
    ubicacion = new_equipo['ubicacion']
    tipo_mantenimiento = new_equipo['tipo_mantenimiento']
    alcance_medicion = new_equipo['alcance_medicion']
    resolucion = new_equipo['resolucion']
    incertidumbre = new_equipo['incertidumbre']
    id_area = new_equipo['id_area']
    cur.execute('UPDATE equipos_lab SET nombre = %s, modelo = %s, serie = %s, ubicacion = %s, tipo_mantenimiento = %s, alcance_medicion = %s, resolucion = %s, incertidumbre = %s, id_area = %s WHERE id = %s RETURNING *',
                (nombre, modelo, serie, ubicacion, tipo_mantenimiento, alcance_medicion, resolucion, incertidumbre, id_area, id,))
    updated_equipo = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    if updated_equipo is None:
        return jsonify({'message': 'Equipo not found'}), 404
    return jsonify(updated_equipo)

@app.get('/api/equipos_lab/<id>')
def get_equipo(id):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('SELECT * FROM areas as a, equipos_lab as e WHERE e.id = %s AND e.id_area = a.id', (id,))
    equipos = cur.fetchone()
    if equipos is None:
        return jsonify({'message': 'Equipos not found'}), 404
    return jsonify(equipos)

@app.get('/api/equipos_lab/area/<id_area>')
def get_equipoarea(id_area):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('SELECT * FROM equipos_lab WHERE id_area = %s', (id_area,))
    equipos = cur.fetchall()
    if equipos is None:
        return jsonify({'message': 'Equipos not found'}), 404
    return jsonify(equipos)



#  MOBILIARIOS  #
@app.get('/api/mobiliarios')
def get_mobiliarios():
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('SELECT * FROM areas as a, mobiliarios as m WHERE m.id_area = a.id')
    mobiliario = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(mobiliario)

@app.get('/api/mobiliarios/count')
def get_countmobiliarios():
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('SELECT count(*) FROM mobiliarios')
    countmobiliarios = cur.fetchone()
    cur.close()
    conn.close()
    return jsonify(countmobiliarios)

@app.post('/api/mobiliarios')
def post_mobiliario():
    new_mobiliario = request.get_json()
    tipo_mob = new_mobiliario['tipo_mob']
    modelo = new_mobiliario['modelo']
    otro = new_mobiliario['otro']
    id_area = new_mobiliario['id_area']
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('INSERT INTO mobiliarios (tipo_mob, modelo, otro, id_area) VALUES (%s, %s, %s, %s) RETURNING *',
                (tipo_mob, modelo, otro, id_area))
    new_create_mobiliario = cur.fetchone()
    print(new_create_mobiliario)
    conn.commit()
    cur.close()
    conn.close()
    return jsonify(new_create_mobiliario)


@app.delete('/api/mobiliarios/eliminar/<id>')
def delete_mobiliario(id):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('DELETE FROM mobiliarios WHERE id = %s RETURNING *', (id,))
    mobiliario = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    if mobiliario is None:
        return jsonify({'message': 'Mobiliario not found'}), 404
    return jsonify(mobiliario)

@app.put('/api/mobiliarios/editar/<id>')
def update_mobiliario(id):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    new_mobiliario = request.get_json()
    tipo_mob = new_mobiliario['tipo_mob']
    modelo = new_mobiliario['modelo']
    otro = new_mobiliario['otro']
    id_area = new_mobiliario['id_area']
    cur.execute('UPDATE mobiliarios SET tipo_mob = %s, modelo = %s, otro= %s, id_area = %s WHERE id = %s RETURNING *',
                (tipo_mob, modelo, otro, id_area, id,))
    updated_mobiliario = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    if updated_mobiliario is None:
        return jsonify({'message': 'User not found'}), 404
    return jsonify(updated_mobiliario)

@app.get('/api/mobiliarios/<id>')
def get_mobiliario(id):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('SELECT * FROM areas as a, mobiliarios as m WHERE m.id = %s AND m.id_area = a.id', (id,))
    mobiliario = cur.fetchone()
    if mobiliario is None:
        return jsonify({'message': 'Mobiliario not found'}), 404
    return jsonify(mobiliario)

@app.get('/api/mobiliarios/area/<id_area>')
def get_mobiliarioarea(id_area):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('SELECT * FROM areas as a, mobiliarios as m WHERE m.id_area = %s AND m.id_area = a.id', (id_area,))
    mobiliario = cur.fetchall()
    if mobiliario is None:
        return jsonify({'message': 'Mobiliario not found'}), 404
    return jsonify(mobiliario)

@app.get('/api/mobiliarios/tipo/<tipo_mob>')
def get_mobiliariotipo(tipo_mob):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('SELECT * FROM areas as a, mobiliarios as m WHERE m.tipo_mob = %s AND m.id_area = a.id', (tipo_mob,))
    mobiliario = cur.fetchall()
    if mobiliario is None:
        return jsonify({'message': 'Mobiliario not found'}), 404
    return jsonify(mobiliario)

@app.get('/api/mobiliarios/tipoyarea/<tipo_mob>/<id_area>')
def get_mobiliariotipoyarea(tipo_mob, id_area):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('SELECT * FROM areas as a, mobiliarios as m WHERE m.tipo_mob = %s AND m.id_area = %s AND m.id_area = a.id', (tipo_mob, id_area,))
    mobiliario = cur.fetchall()
    if mobiliario is None:
        return jsonify({'message': 'Mobiliario not found'}), 404
    return jsonify(mobiliario)


#  VEHÍCULOS  #
@app.get('/api/vehiculos')
def get_vehiculos():
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('SELECT * FROM areas as a, vehiculos as v WHERE v.id_area = a.id')
    vehiculo = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(vehiculo)

@app.get('/api/vehiculos/count')
def get_countvehiculos():
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('SELECT count(*) FROM vehiculos')
    countvehiculos = cur.fetchone()
    cur.close()
    conn.close()
    return jsonify(countvehiculos)

@app.post('/api/vehiculos')
def post_vehiculo():
    new_vehiculo = request.get_json()
    modelo = new_vehiculo['modelo']
    serie = new_vehiculo['serie']
    color = new_vehiculo['color']
    placas = new_vehiculo['placas']
    capacidad = new_vehiculo['capacidad']
    id_area = new_vehiculo['id_area']
    anio = new_vehiculo['anio']
    localizacion = new_vehiculo['localizacion']
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('INSERT INTO vehiculos (modelo, serie, color, placas, capacidad, id_area, anio, localizacion) VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING *',
                (modelo, serie, color, placas, capacidad, id_area, anio, localizacion))
    new_create_vehiculo = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    return jsonify(new_create_vehiculo)

@app.delete('/api/vehiculos/eliminar/<id>')
def delete_vehiculo(id):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('DELETE FROM vehiculos WHERE id = %s RETURNING *', (id,))
    vehiculo = cur.fetchone()
    conn.commit()
    conn.close()
    cur.close()
    if vehiculo is None:
        return jsonify({'message': 'Vehiculo not found'}), 404
    return jsonify(vehiculo)

@app.put('/api/vehiculos/editar/<id>')
def update_vehiculo(id):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    new_vehiculo = request.get_json()
    modelo = new_vehiculo['modelo']
    serie = new_vehiculo['serie']
    anio = new_vehiculo['anio']
    color = new_vehiculo['color']
    placas = new_vehiculo['placas']
    capacidad = new_vehiculo['capacidad']
    id_area = new_vehiculo['id_area']
    cur.execute('UPDATE vehiculos SET modelo = %s, serie = %s, anio = %s, color = %s, placas = %s, capacidad = %s, id_area = %s WHERE id = %s RETURNING *',
                ( modelo, serie, anio, color, placas, capacidad, id_area, id, ))
    updated_vehiculo = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    if updated_vehiculo is None:
        return jsonify({'message': 'Vehiculo not found'}), 404
    return jsonify(updated_vehiculo)

@app.get('/api/vehiculos/<id>')
def get_vehiculo(id):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('SELECT * FROM areas as a, vehiculos as v WHERE v.id = %s AND v.id_area = a.id', (id,))
    vehiculo = cur.fetchone()
    if vehiculo is None:
        return jsonify({'message': 'Vehiculo not found'}), 404
    return jsonify(vehiculo)

@app.get('/api/vehiculos/area/<id_area>')
def get_vehiculo_area(id_area):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute('SELECT * FROM vehiculos WHERE id_area = %s', (id_area,))
    vehiculo = cur.fetchall()
    if vehiculo is None:
        return jsonify({'message': 'Vehiculo not found'}), 404
    return jsonify(vehiculo)


# RUTAS#
@app.get('/')
def index():
    return send_file('static/index.html')



@app.get('/multimedia')
def computo():
    return send_file('./static/multimedia/multimedia.html')

@app.get('/multimedia/registro')
def multimedia_registro():
    return send_file('./static/multimedia/multimedia-registro.html')

@app.get('/multimedia/detalle')
def multimedia_detalle():
    return send_file('./static/multimedia/multimedia-detalle.html')


@app.get('/multimedia/editar')
def multimedia_editar():
    return send_file('./static/multimedia/multimedia-editar.html')


@app.get('/multimedia/eliminar')
def multimedia_eliminar():
    return send_file('./static/multimedia/eliminarMultimedia.html')


@app.get('/laboratorio')
def laboratorio():
    return send_file('./static/laboratorio/laboratorio.html')


@app.get('/laboratorio/registro')
def laboratorio_registro():
    return send_file('./static/laboratorio/laboratorio-registro.html')


@app.get('/laboratorio/editar')
def laboratorio_editar():
    return send_file('./static/laboratorio/laboratorio-editar.html')


@app.get('/laboratorio/eliminar')
def laboratorio_eliminar():
    return send_file('./static/laboratorio/eliminarEquipo.html')

@app.get('/laboratorio/detalle')
def laboratorio_detalle():
    return send_file('./static/laboratorio/laboratorio-detalle.html')

@app.get('/laboratorio/vales')
def laboratorio_vale():
    return send_file('./static/laboratorio/laboratorio-vales.html')

@app.get('/laboratorio/registro/vale')
def laboratorio_registrovale():
    return send_file('./static/laboratorio/laboratorio-registrovales.html')


@app.get('/mobiliario')
def mobiliario():
    return send_file('./static/mobiliarios/mobiliario.html')


@app.get('/mobiliario/registro')
def mobiliario_registro():
    return send_file('./static/mobiliarios/mobilario-registro.html')


@app.get('/mobiliario/editar')
def mobiliario_editar():
    return send_file('./static/mobiliarios/mobilario-editar.html')


@app.get('/mobiliario/eliminar')
def mobiliario_eliminar():
    return send_file('./static/mobiliarios/eliminarMobiliario.html')

@app.get('/mobiliario/detalle')
def mobiliario_detalle():
    return send_file('./static/mobiliarios/mobiliario-detalle.html')


@app.get('/vehiculo')
def vehiculo():
    return send_file('./static/vehiculos/vehiculos.html')


@app.get('/vehiculo/registro')
def vehiculo_registro():
    return send_file('./static/vehiculos/vehiculo-registro.html')


@app.get('/vehiculo/editar')
def vehiculo_editar():
    return send_file('./static/vehiculos/vehiculo-editar.html')

@app.get('/vehiculo/eliminar')
def vehiculo_eliminar():
    return send_file('./static/vehiculos/eliminarVehiculo.html')

@app.get('/vehiculo/detalle')
def vehiculo_detalle():
    return send_file('./static/vehiculos/vehiculo-detalle.html')


@app.get('/vehiculo/vales')
def valesSalida():
    return send_file('./static/vehiculos/vehiculo-vales.html')

@app.get('/vehiculo/registro/vale')
def valesRegistro():
    return send_file('./static/vehiculos/vehiculo-registrovales.html')


if __name__ == '__main__':
    app.run(debug=True)