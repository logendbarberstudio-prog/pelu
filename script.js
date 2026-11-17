// Estado y Persistencia Multi-Sucursal
const DEFAULT_DATA = {
  sucursalActiva: 'suc_1',
  sucursales: [
    { id: 'suc_1', nombre: 'Sucursal Central', direccion: 'Av. Principal #101' },
    { id: 'suc_2', nombre: 'Sucursal Norte', direccion: 'Calle Comercial #45' },
    { id: 'suc_3', nombre: 'Sucursal Sur', direccion: 'Av. Las Palmas #88' }
  ],
  estilistas: [
    { id: 'e1', sucursalId: 'suc_1', nombre: 'Carlos Mendoza', cedula: '1712345678', nacimiento: '1988-03-12' },
    { id: 'e2', sucursalId: 'suc_2', nombre: 'Ana Gómez', cedula: '1723456789', nacimiento: '1992-07-25' },
    { id: 'e3', sucursalId: 'suc_3', nombre: 'Luis Torres', cedula: '1734567890', nacimiento: '1990-11-05' }
  ],
  servicios: [
    { id: 's1', nombre: 'Corte Caballero', precio: 12.00, tipo: 'servicio', fechaCreacion: '2026-01-05', usosCount: 42 },
    { id: 's2', nombre: 'Tinte & Peinado', precio: 35.00, tipo: 'servicio', fechaCreacion: '2026-01-08', usosCount: 18 },
    { id: 's3', nombre: 'Perfilado Barba', precio: 8.00, tipo: 'servicio', fechaCreacion: '2026-01-15', usosCount: 30 }
  ],
  productos: [
    { id: 'p1', sucursalId: 'suc_1', nombre: 'Cera Moldeadora', categoria: 'Capilar', precio: 15.00, stock: 8, tipo: 'producto', fechaCreacion: '2026-01-10' },
    { id: 'p2', sucursalId: 'suc_2', nombre: 'Aceite para Barba', categoria: 'Barba', precio: 18.00, stock: 2, tipo: 'producto', fechaCreacion: '2026-01-12' },
    { id: 'p3', sucursalId: 'suc_1', nombre: 'Shampoo Especial', categoria: 'Capilar', precio: 22.00, stock: 4, tipo: 'producto', fechaCreacion: '2026-02-01' }
  ],
  clientes: [
   { id: 'c_imp_1', nombre: 'Erick Morocho', telefono: '0963026507', email: '', nacimiento: '2017-10-23', fechaCreacion: '2026-10-05', notas: '' },
  { id: 'c_imp_2', nombre: 'Edwin Caguana', telefono: '0997046998', email: '', nacimiento: '2007-05-10', fechaCreacion: '2026-10-04', notas: '' },
  { id: 'c_imp_3', nombre: 'Jhonatan Mayancela', telefono: '0959532513', email: '', nacimiento: '2004-07-23', fechaCreacion: '2026-09-28', notas: '' },
  { id: 'c_imp_4', nombre: 'Luis Fernandez', telefono: '0991724796', email: '', nacimiento: '2012-01-04', fechaCreacion: '2026-09-27', notas: '' },
  { id: 'c_imp_5', nombre: 'Albeyro Velez', telefono: '0990000000', email: '', nacimiento: '2012-05-15', fechaCreacion: '2026-09-25', notas: '' },
  { id: 'c_imp_6', nombre: 'Luis Bermejo', telefono: '0992758192', email: '', nacimiento: '2010-09-27', fechaCreacion: '2026-09-25', notas: '' },
  { id: 'c_imp_7', nombre: 'Jofre Morocho', telefono: '0990000000', email: '', nacimiento: '2019-08-23', fechaCreacion: '2026-09-24', notas: '' },
  { id: 'c_imp_8', nombre: 'Erick Tenezaca', telefono: '0999761390', email: '', nacimiento: '2010-08-22', fechaCreacion: '2026-09-23', notas: '' },
  { id: 'c_imp_9', nombre: 'Welingto Flores', telefono: '0987053466', email: '', nacimiento: '2011-05-15', fechaCreacion: '2026-09-19', notas: '' },
  { id: 'c_imp_10', nombre: 'Lauro Andrade', telefono: '0987162040', email: '', nacimiento: '1987-01-27', fechaCreacion: '2026-09-16', notas: '' },
  { id: 'c_imp_11', nombre: 'Tiago Maisa', telefono: '0990000000', email: '', nacimiento: '2017-03-31', fechaCreacion: '2026-09-06', notas: '' },
  { id: 'c_imp_12', nombre: 'Esteban Vigme', telefono: '0995828610', email: '', nacimiento: '1999-05-27', fechaCreacion: '2026-09-06', notas: '' },
  { id: 'c_imp_13', nombre: 'Jose Mishirumbay', telefono: '0990000000', email: '', nacimiento: '2010-09-10', fechaCreacion: '2026-09-06', notas: '' },
  { id: 'c_imp_14', nombre: 'Carlos Fernandes', telefono: '0997360779', email: '', nacimiento: '2010-10-17', fechaCreacion: '2026-08-31', notas: '' },
  { id: 'c_imp_15', nombre: 'Armando Zueta', telefono: '0979396958', email: '', nacimiento: '1988-05-25', fechaCreacion: '2026-08-23', notas: '' },
  { id: 'c_imp_16', nombre: 'Heydan Chuma', telefono: '0958727863', email: '', nacimiento: '2019-06-20', fechaCreacion: '2026-08-23', notas: '' },
  { id: 'c_imp_17', nombre: 'Alex Ceyeri', telefono: '0990000000', email: '', nacimiento: '2016-05-16', fechaCreacion: '2026-08-07', notas: '' },
  { id: 'c_imp_18', nombre: 'Antonio Campoverde', telefono: '0990000000', email: '', nacimiento: '1990-09-20', fechaCreacion: '2026-08-06', notas: '' },
  { id: 'c_imp_19', nombre: 'Ladimir Alexander', telefono: '0987187790', email: '', nacimiento: '2010-04-30', fechaCreacion: '2026-09-30', notas: '' },
  { id: 'c_imp_20', nombre: 'Kevin Nivelo', telefono: '0990000000', email: '', nacimiento: '2018-06-30', fechaCreacion: '2026-08-05', notas: '' },
  { id: 'c_imp_21', nombre: 'Luis Ordoñez', telefono: '0998604203', email: '', nacimiento: '2010-06-27', fechaCreacion: '2026-08-04', notas: '' },
  { id: 'c_imp_22', nombre: 'Ricardo Mainato', telefono: '0999204708', email: '', nacimiento: '2016-11-25', fechaCreacion: '2026-08-04', notas: '' },
  { id: 'c_imp_23', nombre: 'Enrique Loja', telefono: '0985673861', email: '', nacimiento: '2009-01-11', fechaCreacion: '2026-07-26', notas: '' },
  { id: 'c_imp_24', nombre: 'Saulo Guasco', telefono: '0984023178', email: '', nacimiento: '1990-05-07', fechaCreacion: '2026-07-26', notas: '' },
  { id: 'c_imp_25', nombre: 'William Grefa', telefono: '0939531754', email: '', nacimiento: '2003-05-08', fechaCreacion: '2026-07-26', notas: '' },
  { id: 'c_imp_26', nombre: 'Moises Lema', telefono: '0990504237', email: '', nacimiento: '2005-04-12', fechaCreacion: '2026-07-26', notas: '' },
  { id: 'c_imp_27', nombre: 'Alfredo Yunga', telefono: '0990000000', email: '', nacimiento: '2011-08-03', fechaCreacion: '2026-07-26', notas: '' },
  { id: 'c_imp_28', nombre: 'Luis Cabrera', telefono: '0990000000', email: '', nacimiento: '1988-09-26', fechaCreacion: '2026-07-24', notas: '' },
  { id: 'c_imp_29', nombre: 'Kevin Llibri', telefono: '0983542192', email: '', nacimiento: '2008-03-03', fechaCreacion: '2026-07-22', notas: '' },
  { id: 'c_imp_30', nombre: 'Joel Llibre', telefono: '0962979127', email: '', nacimiento: '2006-05-08', fechaCreacion: '2026-07-22', notas: '' },
  { id: 'c_imp_31', nombre: 'Paul Inga', telefono: '0998263738', email: '', nacimiento: '2010-03-06', fechaCreacion: '2026-07-21', notas: '' },
  { id: 'c_imp_32', nombre: 'Rigoberto Espinoza', telefono: '0990000000', email: '', nacimiento: '2003-10-02', fechaCreacion: '2026-09-19', notas: '' },
  { id: 'c_imp_33', nombre: 'Jhon Morales', telefono: '0990000000', email: '', nacimiento: '2019-12-23', fechaCreacion: '2026-07-19', notas: '' },
  { id: 'c_imp_34', nombre: 'Nicolas Lopez', telefono: '0967077605', email: '', nacimiento: '2002-10-17', fechaCreacion: '2026-07-18', notas: '' },
  { id: 'c_imp_35', nombre: 'Eduardo Buñay', telefono: '0987601384', email: '', nacimiento: '1996-03-22', fechaCreacion: '2026-07-18', notas: '' },
  { id: 'c_imp_36', nombre: 'Edison Cambi', telefono: '0962944036', email: '', nacimiento: '2006-09-15', fechaCreacion: '2026-10-08', notas: '' },
  { id: 'c_imp_37', nombre: 'Franklin Pichazaca', telefono: '0981170487', email: '', nacimiento: '2005-02-11', fechaCreacion: '2026-07-14', notas: '' },
  { id: 'c_imp_38', nombre: 'Kevin Falcon', telefono: '0990000000', email: '', nacimiento: '2012-02-20', fechaCreacion: '2026-07-12', notas: '' },
  { id: 'c_imp_39', nombre: 'Sebastian Rivera', telefono: '0984797649', email: '', nacimiento: '2019-05-19', fechaCreacion: '2026-07-12', notas: '' },
  { id: 'c_imp_40', nombre: 'Alex Loja', telefono: '0980193097', email: '', nacimiento: '2004-04-16', fechaCreacion: '2026-07-12', notas: '' },
  { id: 'c_imp_41', nombre: 'Darwin Guaman', telefono: '0995515869', email: '', nacimiento: '2012-03-06', fechaCreacion: '2026-07-08', notas: '' },
  { id: 'c_imp_42', nombre: 'Edison Ojeda', telefono: '0997984755', email: '', nacimiento: '2011-06-29', fechaCreacion: '2026-07-05', notas: '' },
  { id: 'c_imp_43', nombre: 'Jhonatan Patiño', telefono: '0990000000', email: '', nacimiento: '2008-06-29', fechaCreacion: '2026-07-05', notas: '' },
  { id: 'c_imp_44', nombre: 'Paul Mayazhungo', telefono: '0990000000', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-07-05', notas: '' },
  { id: 'c_imp_45', nombre: 'Pablo Samaniego', telefono: '0999370016', email: '', nacimiento: '2008-05-24', fechaCreacion: '2026-07-01', notas: '' },
  { id: 'c_imp_46', nombre: 'Crstian Tenesaca', telefono: '0988872627', email: '', nacimiento: '1996-10-30', fechaCreacion: '2026-07-28', notas: '' },
  { id: 'c_imp_47', nombre: 'Crstian Mayazhungo', telefono: '0990000000', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_48', nombre: 'Luis Tapay', telefono: '0990000000', email: '', nacimiento: '2003-04-15', fechaCreacion: '2026-07-01', notas: '' },
  { id: 'c_imp_49', nombre: 'Brandon Espinosa', telefono: '0958717717', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-08-02', notas: '' },
  { id: 'c_imp_50', nombre: 'Carlos Romero', telefono: '0984291014', email: '', nacimiento: '1982-09-08', fechaCreacion: '2026-06-27', notas: '' },
  { id: 'c_imp_51', nombre: 'Daniel Vasquez', telefono: '098376559', email: '', nacimiento: '2007-10-08', fechaCreacion: '2026-06-26', notas: '' },
  { id: 'c_imp_52', nombre: 'Klever Montero', telefono: '0995873025', email: '', nacimiento: '1986-10-17', fechaCreacion: '2026-06-22', notas: '' },
  { id: 'c_imp_53', nombre: 'Joel Tenelema', telefono: '0983517596', email: '', nacimiento: '2010-01-15', fechaCreacion: '2026-07-05', notas: '' },
  { id: 'c_imp_54', nombre: 'Pedro Guaman', telefono: '0995624579', email: '', nacimiento: '2005-05-13', fechaCreacion: '2026-06-14', notas: '' },
  { id: 'c_imp_55', nombre: 'Luis Caguana', telefono: '0990000000', email: '', nacimiento: '2009-06-15', fechaCreacion: '2026-06-14', notas: '' },
  { id: 'c_imp_56', nombre: 'Jose Castro', telefono: '0990000000', email: '', nacimiento: '2010-07-10', fechaCreacion: '2026-06-14', notas: '' },
  { id: 'c_imp_57', nombre: 'Veto Espinosa', telefono: '0998033118', email: '', nacimiento: '2003-10-02', fechaCreacion: '2026-06-13', notas: '' },
  { id: 'c_imp_58', nombre: 'Manuel Montero', telefono: '0997733141', email: '', nacimiento: '2012-07-31', fechaCreacion: '2026-06-10', notas: '' },
  { id: 'c_imp_59', nombre: 'Liam Vermeo', telefono: '0990000000', email: '', nacimiento: '2022-06-15', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_60', nombre: 'Yael Mayancela', telefono: '0990000000', email: '', nacimiento: '2024-06-17', fechaCreacion: '2026-06-07', notas: '' },
  { id: 'c_imp_61', nombre: 'Edwin Mayancela', telefono: '096903338', email: '', nacimiento: '2005-06-02', fechaCreacion: '2026-06-07', notas: '' },
  { id: 'c_imp_62', nombre: 'Jhonatan Rodriguez', telefono: '0983248874', email: '', nacimiento: '1996-11-01', fechaCreacion: '2026-06-07', notas: '' },
  { id: 'c_imp_63', nombre: 'Edgar Guaman', telefono: '0995275149', email: '', nacimiento: '1995-02-14', fechaCreacion: '2026-06-07', notas: '' },
  { id: 'c_imp_64', nombre: 'Cristian Morocho', telefono: '0995449716', email: '', nacimiento: '2006-11-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_65', nombre: 'Cristian Morocho', telefono: '0979104537', email: '', nacimiento: '2010-10-05', fechaCreacion: '2026-06-02', notas: '' },
  { id: 'c_imp_66', nombre: 'Dany Yupa', telefono: '0959542803', email: '', nacimiento: '2009-11-05', fechaCreacion: '2026-06-01', notas: '' },
  { id: 'c_imp_67', nombre: 'Darwin Chicayza', telefono: '0983036296', email: '', nacimiento: '2009-12-27', fechaCreacion: '2026-06-01', notas: '' },
  { id: 'c_imp_68', nombre: 'Adrian Huerta', telefono: '0983296311', email: '', nacimiento: '2014-08-11', fechaCreacion: '2026-06-01', notas: '' },
  { id: 'c_imp_69', nombre: 'Yafer Zaruma', telefono: '0990000000', email: '', nacimiento: '2011-07-15', fechaCreacion: '2026-05-31', notas: '' },
  { id: 'c_imp_70', nombre: 'Moises Guaraca', telefono: '0998755918', email: '', nacimiento: '2011-03-11', fechaCreacion: '2026-10-04', notas: '' },
  { id: 'c_imp_71', nombre: 'Leonardo Encalada', telefono: '0969494334', email: '', nacimiento: '1996-04-02', fechaCreacion: '2026-05-30', notas: '' },
  { id: 'c_imp_72', nombre: 'Paul Andrade', telefono: '0990000000', email: '', nacimiento: '2012-12-02', fechaCreacion: '2026-07-24', notas: '' },
  { id: 'c_imp_73', nombre: 'Jhonatan Pizha', telefono: '0990000000', email: '', nacimiento: '2006-06-18', fechaCreacion: '2026-05-28', notas: '' },
  { id: 'c_imp_74', nombre: 'Efrain Pizha', telefono: '0990000000', email: '', nacimiento: '2008-06-23', fechaCreacion: '2026-05-28', notas: '' },
  { id: 'c_imp_75', nombre: 'Luis Barahona', telefono: '0991649132', email: '', nacimiento: '1999-12-05', fechaCreacion: '2026-05-27', notas: '' },
  { id: 'c_imp_76', nombre: 'Pedro Barahona', telefono: '0987940448', email: '', nacimiento: '2001-09-11', fechaCreacion: '2026-05-27', notas: '' },
  { id: 'c_imp_77', nombre: 'Erick Pomavilla', telefono: '0984076001', email: '', nacimiento: '2015-06-23', fechaCreacion: '2026-09-01', notas: '' },
  { id: 'c_imp_78', nombre: 'Edison Chimbo', telefono: '0984744095', email: '', nacimiento: '2000-12-21', fechaCreacion: '2026-05-26', notas: '' },
  { id: 'c_imp_79', nombre: 'Carlos Melendres', telefono: '0984331616', email: '', nacimiento: '2009-08-21', fechaCreacion: '2026-06-12', notas: '' },
  { id: 'c_imp_80', nombre: 'Fernando Granda', telefono: '0939919410', email: '', nacimiento: '2001-08-15', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_81', nombre: 'Kevin Allaico', telefono: '0997683811', email: '', nacimiento: '2009-04-29', fechaCreacion: '2026-09-16', notas: '' },
  { id: 'c_imp_82', nombre: 'Lenin Bermeo', telefono: '097960122', email: '', nacimiento: '2010-06-24', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_83', nombre: 'Abraham Chimbo', telefono: '0990000000', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_84', nombre: 'Abrham Villavicencio', telefono: '0983547586', email: '', nacimiento: '2008-08-07', fechaCreacion: '2026-08-07', notas: '' },
  { id: 'c_imp_85', nombre: 'Adrian Flores', telefono: '0998357834', email: '', nacimiento: '2006-07-11', fechaCreacion: '2026-04-25', notas: '' },
  { id: 'c_imp_86', nombre: 'Adrian Lala', telefono: '0984691736', email: '', nacimiento: '2009-12-18', fechaCreacion: '2026-06-28', notas: '' },
  { id: 'c_imp_87', nombre: 'Adrian Lala', telefono: '098646672', email: '', nacimiento: '2009-09-02', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_88', nombre: 'Adrian Lopez', telefono: '0981072810', email: '', nacimiento: '2011-03-16', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_89', nombre: 'Adrian Mayancela', telefono: '0962639960', email: '', nacimiento: '2012-11-08', fechaCreacion: '2026-07-24', notas: '' },
  { id: 'c_imp_90', nombre: 'Adrian Mullo', telefono: '0990000000', email: '', nacimiento: '2010-10-01', fechaCreacion: '2026-06-23', notas: '' },
  { id: 'c_imp_91', nombre: 'Adrian Ordoñes', telefono: '0958882053', email: '', nacimiento: '2001-08-04', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_92', nombre: 'Adrian Ortiz', telefono: '0984429008', email: '', nacimiento: '1991-11-02', fechaCreacion: '2026-07-17', notas: '' },
  { id: 'c_imp_93', nombre: 'Adrian Yanez', telefono: '0990000000', email: '', nacimiento: '2012-01-06', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_94', nombre: 'Alberto Guaman', telefono: '0990000000', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_95', nombre: 'Alberto Tapia', telefono: '0995924437', email: '', nacimiento: '2006-07-25', fechaCreacion: '2026-05-08', notas: '' },
  { id: 'c_imp_96', nombre: 'Alejandro Calva', telefono: '0983713038', email: '', nacimiento: '2009-03-09', fechaCreacion: '2026-09-19', notas: '' },
  { id: 'c_imp_97', nombre: 'Alejandro Gonzalez', telefono: '0959096103', email: '', nacimiento: '2004-10-21', fechaCreacion: '2026-07-16', notas: '' },
  { id: 'c_imp_98', nombre: 'Alejandro Largo', telefono: '0983044339', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-04-24', notas: '' },
  { id: 'c_imp_99', nombre: 'Alejandro Montero', telefono: '0990000000', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-04-19', notas: '' },
  { id: 'c_imp_100', nombre: 'Alejandro Serrano', telefono: '0983165286', email: '', nacimiento: '2010-01-16', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_101', nombre: 'Alex Barros', telefono: '0990000000', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-04-18', notas: '' },
  { id: 'c_imp_102', nombre: 'Alex Camas', telefono: '0983027773', email: '', nacimiento: '2010-12-20', fechaCreacion: '2026-07-09', notas: '' },
  { id: 'c_imp_103', nombre: 'Alex Cazho', telefono: '0992741311', email: '', nacimiento: '2002-06-24', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_104', nombre: 'Alex Chafa', telefono: '0990000000', email: '', nacimiento: '2009-03-23', fechaCreacion: '2026-03-22', notas: '' },
  { id: 'c_imp_105', nombre: 'Alex Guaman', telefono: '0986249492', email: '', nacimiento: '2010-08-20', fechaCreacion: '2026-05-12', notas: '' },
  { id: 'c_imp_106', nombre: 'Alex Guasco', telefono: '0990000000', email: '', nacimiento: '2007-03-16', fechaCreacion: '2026-02-24', notas: '' },
  { id: 'c_imp_107', nombre: 'Alex Lala', telefono: '0981350642', email: '', nacimiento: '2010-12-11', fechaCreacion: '2026-05-17', notas: '' },
  { id: 'c_imp_108', nombre: 'Alex Loja', telefono: '0962599844', email: '', nacimiento: '2010-04-27', fechaCreacion: '2026-05-04', notas: '' },
  { id: 'c_imp_109', nombre: 'Alex Loja', telefono: '0990000000', email: '', nacimiento: '2010-10-10', fechaCreacion: '2026-05-03', notas: '' },
  { id: 'c_imp_110', nombre: 'Alex Lucero', telefono: '0992589913', email: '', nacimiento: '2006-07-18', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_111', nombre: 'Alex Morocho', telefono: '0984952791', email: '', nacimiento: '2006-11-14', fechaCreacion: '2026-07-05', notas: '' },
  { id: 'c_imp_112', nombre: 'Alex Padilla', telefono: '0998826844', email: '', nacimiento: '2012-06-24', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_113', nombre: 'Alex Pomavilla', telefono: '0992867541', email: '', nacimiento: '2008-07-17', fechaCreacion: '2026-04-26', notas: '' },
  { id: 'c_imp_114', nombre: 'Alex Pomavilla', telefono: '0969547311', email: '', nacimiento: '2009-09-24', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_115', nombre: 'Alex Pomabilla', telefono: '0992865542', email: '', nacimiento: '2008-07-17', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_116', nombre: 'Alex Quindi', telefono: '09986777456', email: '', nacimiento: '2001-12-20', fechaCreacion: '2026-05-22', notas: '' },
  { id: 'c_imp_117', nombre: 'Alex Saelteros', telefono: '0990869685', email: '', nacimiento: '1999-07-20', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_118', nombre: 'Alex Sarmiento', telefono: '0967473651', email: '', nacimiento: '2012-08-22', fechaCreacion: '2026-04-02', notas: '' },
  { id: 'c_imp_119', nombre: 'Alex Tenelema', telefono: '0990000000', email: '', nacimiento: '2009-08-22', fechaCreacion: '2026-09-23', notas: '' },
  { id: 'c_imp_120', nombre: 'Alex Zamora', telefono: '0958819198', email: '', nacimiento: '2005-07-13', fechaCreacion: '2026-03-10', notas: '' },
  { id: 'c_imp_121', nombre: 'Alexander Bajarano', telefono: '0990000000', email: '', nacimiento: '2007-04-01', fechaCreacion: '2026-04-26', notas: '' },
  { id: 'c_imp_122', nombre: 'Alexander Duy', telefono: '0990000000', email: '', nacimiento: '2020-03-27', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_123', nombre: 'Alexander Duy', telefono: '0990000000', email: '', nacimiento: '2011-06-30', fechaCreacion: '2026-03-03', notas: '' },
  { id: 'c_imp_124', nombre: 'Alexander Guaman', telefono: '0990000000', email: '', nacimiento: '2006-04-06', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_125', nombre: 'Alexander Lema', telefono: '0984428797', email: '', nacimiento: '2009-09-22', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_126', nombre: 'Alexander Quesada', telefono: '0990000000', email: '', nacimiento: '2000-07-07', fechaCreacion: '2026-06-01', notas: '' },
  { id: 'c_imp_127', nombre: 'Alexander Rivera', telefono: '0969760577', email: '', nacimiento: '2008-11-22', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_128', nombre: 'Alexander Siguencia', telefono: '0990000000', email: '', nacimiento: '2011-06-16', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_129', nombre: 'Alexis Baraona', telefono: '0990000000', email: '', nacimiento: '2005-03-27', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_130', nombre: 'Alexis Chuma', telefono: '0990000000', email: '', nacimiento: '2015-03-14', fechaCreacion: '2026-02-27', notas: '' },
  { id: 'c_imp_131', nombre: 'Alexis Cungachi', telefono: '0962971224', email: '', nacimiento: '2010-11-30', fechaCreacion: '2026-04-29', notas: '' },
  { id: 'c_imp_132', nombre: 'Alexis Guaman', telefono: '0958783306', email: '', nacimiento: '2010-11-30', fechaCreacion: '2026-07-08', notas: '' },
  { id: 'c_imp_133', nombre: 'Alexis Guaman', telefono: '0990000000', email: '', nacimiento: '2012-11-07', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_134', nombre: 'Alexis Guaman', telefono: '0995640077', email: '', nacimiento: '2010-04-12', fechaCreacion: '2026-04-07', notas: '' },
  { id: 'c_imp_135', nombre: 'Alexis Mainato', telefono: '0990000000', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-03-08', notas: '' },
  { id: 'c_imp_136', nombre: 'Alexis Narango', telefono: '0984290402', email: '', nacimiento: '2010-05-01', fechaCreacion: '2026-07-10', notas: '' },
  { id: 'c_imp_137', nombre: 'Alexis Palacios', telefono: '0990000000', email: '', nacimiento: '2007-01-27', fechaCreacion: '2026-03-23', notas: '' },
  { id: 'c_imp_138', nombre: 'Alexis Quito', telefono: '0986900422', email: '', nacimiento: '2010-04-26', fechaCreacion: '2026-05-26', notas: '' },
  { id: 'c_imp_139', nombre: 'Alfredo Pillaga', telefono: '0987903399', email: '', nacimiento: '2001-12-13', fechaCreacion: '2026-07-16', notas: '' },
  { id: 'c_imp_140', nombre: 'Alison Mayazhungo', telefono: '0981587809', email: '', nacimiento: '2015-04-23', fechaCreacion: '2026-05-03', notas: '' },
  { id: 'c_imp_141', nombre: 'Anderson Morocho', telefono: '0990000000', email: '', nacimiento: '2013-11-26', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_142', nombre: 'Anderson Pichizaca', telefono: '0990000000', email: '', nacimiento: '2008-09-28', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_143', nombre: 'Anderson Sanchez', telefono: '0995379154', email: '', nacimiento: '2007-09-24', fechaCreacion: '2026-06-08', notas: '' },
  { id: 'c_imp_144', nombre: 'Anderson Sanchez', telefono: '0981346714', email: '', nacimiento: '2008-05-18', fechaCreacion: '2026-04-17', notas: '' },
  { id: 'c_imp_145', nombre: 'Anderson Tenezaca', telefono: '0992865629', email: '', nacimiento: '2009-06-04', fechaCreacion: '2026-03-01', notas: '' },
  { id: 'c_imp_146', nombre: 'Andres Alvarez', telefono: '0969167809', email: '', nacimiento: '2009-08-03', fechaCreacion: '2026-03-05', notas: '' },
  { id: 'c_imp_147', nombre: 'Andres Caguana', telefono: '0989622991', email: '', nacimiento: '2010-07-05', fechaCreacion: '2026-04-01', notas: '' },
  { id: 'c_imp_148', nombre: 'Andres Lazo', telefono: '0990000000', email: '', nacimiento: '2007-03-19', fechaCreacion: '2026-03-09', notas: '' },
  { id: 'c_imp_149', nombre: 'Andres Siguencia', telefono: '0995131250', email: '', nacimiento: '2009-11-15', fechaCreacion: '2026-03-24', notas: '' },
  { id: 'c_imp_150', nombre: 'Andy Allaico', telefono: '0995472700', email: '', nacimiento: '2007-02-08', fechaCreacion: '2026-05-04', notas: '' },
  { id: 'c_imp_151', nombre: 'Andy Lala', telefono: '0990048474', email: '', nacimiento: '2004-11-27', fechaCreacion: '2026-04-05', notas: '' },
  { id: 'c_imp_152', nombre: 'Andy Landy', telefono: '0987820965', email: '', nacimiento: '2011-08-14', fechaCreacion: '2026-05-06', notas: '' },
  { id: 'c_imp_153', nombre: 'Andy Lema', telefono: '0987981000', email: '', nacimiento: '1997-03-18', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_154', nombre: 'Andy Mainato', telefono: '0989855535', email: '', nacimiento: '2010-10-12', fechaCreacion: '2026-08-30', notas: '' },
  { id: 'c_imp_155', nombre: 'Andy Pomaquiza', telefono: '0990000000', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_156', nombre: 'Angel Bermejo', telefono: '0962698439', email: '', nacimiento: '2012-11-08', fechaCreacion: '2026-07-26', notas: '' },
  { id: 'c_imp_157', nombre: 'Angel Cela', telefono: '0990000000', email: '', nacimiento: '2010-09-03', fechaCreacion: '2026-06-21', notas: '' },
  { id: 'c_imp_158', nombre: 'Angel Guaman', telefono: '0990000000', email: '', nacimiento: '2017-07-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_159', nombre: 'Angel Lema', telefono: '0967968507', email: '', nacimiento: '2006-12-23', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_160', nombre: 'Angel Mainato', telefono: '0998878205', email: '', nacimiento: '2007-11-05', fechaCreacion: '2026-05-10', notas: '' },
  { id: 'c_imp_161', nombre: 'Angel Pomaquiza', telefono: '0994419265', email: '', nacimiento: '2000-02-15', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_162', nombre: 'Angel Pomavilla', telefono: '0990000000', email: '', nacimiento: '2005-11-10', fechaCreacion: '2026-03-22', notas: '' },
  { id: 'c_imp_163', nombre: 'Angel Yupa', telefono: '0990000000', email: '', nacimiento: '1998-11-03', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_164', nombre: 'Angelo Cungachi', telefono: '0995053469', email: '', nacimiento: '2010-10-10', fechaCreacion: '2026-07-08', notas: '' },
  { id: 'c_imp_165', nombre: 'Angelo Lema', telefono: '0968665499', email: '', nacimiento: '2010-11-05', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_166', nombre: 'Aniston Vargas', telefono: '0939083647', email: '', nacimiento: '2006-01-28', fechaCreacion: '2026-03-08', notas: '' },
  { id: 'c_imp_167', nombre: 'Anthony Romero', telefono: '0962997998', email: '', nacimiento: '2010-09-13', fechaCreacion: '2026-05-13', notas: '' },
  { id: 'c_imp_168', nombre: 'Antoni Cuzco', telefono: '0990000000', email: '', nacimiento: '2015-11-25', fechaCreacion: '2026-04-09', notas: '' },
  { id: 'c_imp_169', nombre: 'Antoni Ortiz', telefono: '0992758162', email: '', nacimiento: '2010-11-28', fechaCreacion: '2026-06-17', notas: '' },
  { id: 'c_imp_170', nombre: 'Antonio Alulema', telefono: '0990000000', email: '', nacimiento: '1977-09-20', fechaCreacion: '2026-07-19', notas: '' },
  { id: 'c_imp_171', nombre: 'Antonio Duchi', telefono: '0987307675', email: '', nacimiento: '2008-01-24', fechaCreacion: '2026-06-07', notas: '' },
  { id: 'c_imp_172', nombre: 'Antony Chimbo', telefono: '0990000000', email: '', nacimiento: '2017-05-21', fechaCreacion: '2026-04-08', notas: '' },
  { id: 'c_imp_173', nombre: 'Antony Lazo', telefono: '0979123341', email: '', nacimiento: '2010-09-11', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_174', nombre: 'Antony Mesa', telefono: '0987252200', email: '', nacimiento: '2013-08-18', fechaCreacion: '2026-10-07', notas: '' },
  { id: 'c_imp_175', nombre: 'Antony Montero', telefono: '0998966583', email: '', nacimiento: '2003-08-25', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_176', nombre: 'Antony Sanchez', telefono: '0985379154', email: '', nacimiento: '2012-08-31', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_177', nombre: 'Antony Verdugo', telefono: '0958850979', email: '', nacimiento: '2008-11-29', fechaCreacion: '2026-05-17', notas: '' },
  { id: 'c_imp_178', nombre: 'Ariel Siguencia', telefono: '0982563051', email: '', nacimiento: '2007-05-11', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_179', nombre: 'Armando Guaman', telefono: '0990000000', email: '', nacimiento: '1996-05-30', fechaCreacion: '2026-04-02', notas: '' },
  { id: 'c_imp_180', nombre: 'Armando Parra', telefono: '0983057396', email: '', nacimiento: '2010-10-10', fechaCreacion: '2026-04-15', notas: '' },
  { id: 'c_imp_181', nombre: 'Armando Rosas', telefono: '0983440598', email: '', nacimiento: '2012-12-01', fechaCreacion: '2026-07-25', notas: '' },
  { id: 'c_imp_182', nombre: 'Aron Vermeo', telefono: '0990000000', email: '', nacimiento: '2022-02-17', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_183', nombre: 'Aron Garcia', telefono: '0987372672', email: '', nacimiento: '2011-06-10', fechaCreacion: '2026-05-21', notas: '' },
  { id: 'c_imp_184', nombre: 'Asdrian Espinoza', telefono: '0959726359', email: '', nacimiento: '2003-06-17', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_185', nombre: 'Atik Buscan', telefono: '0987961469', email: '', nacimiento: '2010-02-10', fechaCreacion: '2026-07-12', notas: '' },
  { id: 'c_imp_186', nombre: 'Atik Chuma', telefono: '099287682', email: '', nacimiento: '2009-12-15', fechaCreacion: '2026-04-14', notas: '' },
  { id: 'c_imp_187', nombre: 'Atik Pichisaca', telefono: '0995185545', email: '', nacimiento: '2010-08-27', fechaCreacion: '2026-05-18', notas: '' },
  { id: 'c_imp_188', nombre: 'Bayron Humala', telefono: '0992839395', email: '', nacimiento: '2010-10-18', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_189', nombre: 'Bayron Maiza', telefono: '0991258757', email: '', nacimiento: '1998-06-16', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_190', nombre: 'Bayron Morales', telefono: '0962602858', email: '', nacimiento: '2008-07-07', fechaCreacion: '2026-05-07', notas: '' },
  { id: 'c_imp_191', nombre: 'Bayron Simbaina', telefono: '0990000000', email: '', nacimiento: '2008-04-02', fechaCreacion: '2026-02-27', notas: '' },
  { id: 'c_imp_192', nombre: 'Bayron Yupa', telefono: '0998133591', email: '', nacimiento: '2008-04-02', fechaCreacion: '2026-03-20', notas: '' },
  { id: 'c_imp_193', nombre: 'Bolivar Lema', telefono: '0995143239', email: '', nacimiento: '2008-09-22', fechaCreacion: '2026-05-10', notas: '' },
  { id: 'c_imp_194', nombre: 'Brady Caguana', telefono: '0990000000', email: '', nacimiento: '2010-09-23', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_195', nombre: 'Brandon Fagardo', telefono: '0990000000', email: '', nacimiento: '2010-01-10', fechaCreacion: '2026-03-08', notas: '' },
  { id: 'c_imp_196', nombre: 'Brayan Bermeo', telefono: '0990000000', email: '', nacimiento: '2008-01-15', fechaCreacion: '2026-03-23', notas: '' },
  { id: 'c_imp_197', nombre: 'Brayan Cabrera', telefono: '0962856570', email: '', nacimiento: '2002-03-17', fechaCreacion: '2026-05-15', notas: '' },
  { id: 'c_imp_198', nombre: 'Brayan Chima', telefono: '0990000000', email: '', nacimiento: '2010-05-31', fechaCreacion: '2026-06-26', notas: '' },
  { id: 'c_imp_199', nombre: 'Brayan Fares', telefono: '0996727789', email: '', nacimiento: '2008-01-14', fechaCreacion: '2026-03-28', notas: '' },
  { id: 'c_imp_200', nombre: 'Brayan Guaman', telefono: '0997949720', email: '', nacimiento: '2009-04-13', fechaCreacion: '2026-04-22', notas: '' },
  { id: 'c_imp_201', nombre: 'Brayan Jimenez', telefono: '0987433037', email: '', nacimiento: '2009-02-17', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_202', nombre: 'Brayan Loja', telefono: '0979290698', email: '', nacimiento: '2010-05-31', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_203', nombre: 'Brayan Sanchez', telefono: '0990000000', email: '', nacimiento: '2009-02-14', fechaCreacion: '2026-03-10', notas: '' },
  { id: 'c_imp_204', nombre: 'Brayan Santos', telefono: '0962932930', email: '', nacimiento: '2010-07-21', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_205', nombre: 'Brayan Tacuri', telefono: '0992624463', email: '', nacimiento: '2012-10-13', fechaCreacion: '2026-05-03', notas: '' },
  { id: 'c_imp_206', nombre: 'Brayan Yupa', telefono: '0984854888', email: '', nacimiento: '2010-04-26', fechaCreacion: '2026-05-08', notas: '' },
  { id: 'c_imp_207', nombre: 'Brayan Zanches', telefono: '0995534408', email: '', nacimiento: '2009-02-14', fechaCreacion: '2026-04-13', notas: '' },
  { id: 'c_imp_208', nombre: 'Bryam Parra', telefono: '0962825343', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_209', nombre: 'Bryan Acero', telefono: '0985678497', email: '', nacimiento: '2008-09-23', fechaCreacion: '2026-04-14', notas: '' },
  { id: 'c_imp_210', nombre: 'Bryan Duy', telefono: '0979170372', email: '', nacimiento: '2004-04-13', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_211', nombre: 'Bryan Guaman', telefono: '0939535219', email: '', nacimiento: '2004-12-29', fechaCreacion: '2026-04-30', notas: '' },
  { id: 'c_imp_212', nombre: 'Bryan Nivelo', telefono: '0990000000', email: '', nacimiento: '2012-05-17', fechaCreacion: '2026-08-05', notas: '' },
  { id: 'c_imp_213', nombre: 'Bryan Ochoa', telefono: '0983864781', email: '', nacimiento: '2009-12-13', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_214', nombre: 'Bryan Verdezota', telefono: '0999983658', email: '', nacimiento: '2008-01-15', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_215', nombre: 'Carlos Vermeo', telefono: '0990000000', email: '', nacimiento: '1992-01-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_216', nombre: 'Carlos Chauca', telefono: '0983042225', email: '', nacimiento: '2009-03-30', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_217', nombre: 'Carlos Choro', telefono: '091559615', email: '', nacimiento: '2008-09-25', fechaCreacion: '2026-05-10', notas: '' },
  { id: 'c_imp_218', nombre: 'Carlos Collaguaso', telefono: '0990000000', email: '', nacimiento: '2008-07-02', fechaCreacion: '2026-04-17', notas: '' },
  { id: 'c_imp_219', nombre: 'Carlos Cortiz', telefono: '09883228009', email: '', nacimiento: '2009-05-11', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_220', nombre: 'Carlos Culala', telefono: '0990000000', email: '', nacimiento: '2012-08-10', fechaCreacion: '2026-05-04', notas: '' },
  { id: 'c_imp_221', nombre: 'Carlos Guaman', telefono: '0969005209', email: '', nacimiento: '1992-07-19', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_222', nombre: 'Carlos Huerta', telefono: '0987857545', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_223', nombre: 'Carlos Lala', telefono: '0990000000', email: '', nacimiento: '2001-10-14', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_224', nombre: 'Carlos Martinez', telefono: '0996865805', email: '', nacimiento: '2012-08-08', fechaCreacion: '2026-06-26', notas: '' },
  { id: 'c_imp_225', nombre: 'Carlos Montoya', telefono: '0979218824', email: '', nacimiento: '2012-11-30', fechaCreacion: '2026-04-29', notas: '' },
  { id: 'c_imp_226', nombre: 'Carlos Morocho', telefono: '0992731729', email: '', nacimiento: '2011-07-24', fechaCreacion: '2026-05-21', notas: '' },
  { id: 'c_imp_227', nombre: 'Carlos Morocho', telefono: '0990000000', email: '', nacimiento: '2010-07-24', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_228', nombre: 'Carlos Naula', telefono: '0984156998', email: '', nacimiento: '2000-11-17', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_229', nombre: 'Carlos Ochoa', telefono: '0998052975', email: '', nacimiento: '2017-01-31', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_230', nombre: 'Carlos Ordoñez', telefono: '0987092615', email: '', nacimiento: '2008-12-27', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_231', nombre: 'Carlos Rodriguez', telefono: '09979386722', email: '', nacimiento: '2014-04-15', fechaCreacion: '2026-07-24', notas: '' },
  { id: 'c_imp_232', nombre: 'Carlos Vargas', telefono: '0990000000', email: '', nacimiento: '1998-08-05', fechaCreacion: '2026-03-01', notas: '' },
  { id: 'c_imp_233', nombre: 'Carlos Velasquez', telefono: '0988144325', email: '', nacimiento: '2010-07-31', fechaCreacion: '2026-03-20', notas: '' },
  { id: 'c_imp_234', nombre: 'Cesar Cardenas', telefono: '0992945354', email: '', nacimiento: '1974-12-20', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_235', nombre: 'Cesar Espinoza', telefono: '0987772910', email: '', nacimiento: '1998-03-06', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_236', nombre: 'Charly Lala', telefono: '0990000000', email: '', nacimiento: '2012-03-13', fechaCreacion: '2026-05-03', notas: '' },
  { id: 'c_imp_237', nombre: 'Chino Lala', telefono: '0988081346', email: '', nacimiento: '2007-02-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_238', nombre: 'Claudio Lala', telefono: '0969015731', email: '', nacimiento: '2007-08-07', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_239', nombre: 'Cristian Acosta', telefono: '0987869698', email: '', nacimiento: '2007-08-28', fechaCreacion: '2026-02-26', notas: '' },
  { id: 'c_imp_240', nombre: 'Cristian Adrian', telefono: '0990000000', email: '', nacimiento: '2017-12-07', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_241', nombre: 'Cristian Aguaiza', telefono: '0962152634', email: '', nacimiento: '2004-01-15', fechaCreacion: '2026-04-05', notas: '' },
  { id: 'c_imp_242', nombre: 'Cristian Barros', telefono: '0985283933', email: '', nacimiento: '2004-01-02', fechaCreacion: '2026-03-05', notas: '' },
  { id: 'c_imp_243', nombre: 'Cristian Buñay', telefono: '0990000000', email: '', nacimiento: '2012-02-06', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_244', nombre: 'Cristian Carrio', telefono: '0959135220', email: '', nacimiento: '2006-06-08', fechaCreacion: '2026-04-07', notas: '' },
  { id: 'c_imp_245', nombre: 'Cristian Chucho', telefono: '0983438467', email: '', nacimiento: '2000-12-07', fechaCreacion: '2026-04-25', notas: '' },
  { id: 'c_imp_246', nombre: 'Cristian Espinoza', telefono: '0984895375', email: '', nacimiento: '2010-11-09', fechaCreacion: '2026-06-05', notas: '' },
  { id: 'c_imp_247', nombre: 'Cristian Espinoza', telefono: '0990000000', email: '', nacimiento: '2008-02-17', fechaCreacion: '2026-05-22', notas: '' },
  { id: 'c_imp_248', nombre: 'Cristian Guaman', telefono: '0995817801', email: '', nacimiento: '2012-01-08', fechaCreacion: '2026-03-27', notas: '' },
  { id: 'c_imp_249', nombre: 'Cristian Guaman', telefono: '0984147031', email: '', nacimiento: '2001-07-05', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_250', nombre: 'Cristian Guaman', telefono: '096911058', email: '', nacimiento: '2007-09-05', fechaCreacion: '2026-03-22', notas: '' },
  { id: 'c_imp_251', nombre: 'Cristian Guaman', telefono: '0984119053', email: '', nacimiento: '2007-03-18', fechaCreacion: '2026-04-05', notas: '' },
  { id: 'c_imp_252', nombre: 'Cristian Guaraca', telefono: '0962864177', email: '', nacimiento: '2010-12-27', fechaCreacion: '2026-05-13', notas: '' },
  { id: 'c_imp_253', nombre: 'Cristian Jadan', telefono: '0997536416', email: '', nacimiento: '2011-08-07', fechaCreacion: '2026-05-17', notas: '' },
  { id: 'c_imp_254', nombre: 'Cristian Lema', telefono: '0983411949', email: '', nacimiento: '2010-06-23', fechaCreacion: '2026-05-20', notas: '' },
  { id: 'c_imp_255', nombre: 'Cristian Loja', telefono: '0987200913', email: '', nacimiento: '2005-01-01', fechaCreacion: '2026-07-08', notas: '' },
  { id: 'c_imp_256', nombre: 'Cristian Martinez', telefono: '0990000000', email: '', nacimiento: '2007-05-25', fechaCreacion: '2026-02-26', notas: '' },
  { id: 'c_imp_257', nombre: 'Cristian Molina', telefono: '0983280142', email: '', nacimiento: '1988-04-27', fechaCreacion: '2026-09-29', notas: '' },
  { id: 'c_imp_258', nombre: 'Cristian Muyulema', telefono: '0998808365', email: '', nacimiento: '2001-03-18', fechaCreacion: '2026-05-04', notas: '' },
  { id: 'c_imp_259', nombre: 'Cristian Ortiz', telefono: '0987721273', email: '', nacimiento: '2004-09-01', fechaCreacion: '2026-09-21', notas: '' },
  { id: 'c_imp_260', nombre: 'Cristian Padron', telefono: '0990000000', email: '', nacimiento: '2010-02-22', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_261', nombre: 'Cristian Pichazaca', telefono: '0990000000', email: '', nacimiento: '2004-01-23', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_262', nombre: 'Cristian Pichizaca', telefono: '09957975444', email: '', nacimiento: '2009-01-15', fechaCreacion: '2026-09-24', notas: '' },
  { id: 'c_imp_263', nombre: 'Cristian Romero', telefono: '0998492645', email: '', nacimiento: '2006-10-18', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_264', nombre: 'Cristian Tenezaca', telefono: '0990000000', email: '', nacimiento: '1996-10-30', fechaCreacion: '2026-05-10', notas: '' },
  { id: 'c_imp_265', nombre: 'Cristian Tigsi', telefono: '0984858894', email: '', nacimiento: '2008-06-08', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_266', nombre: 'Cristian Yunga', telefono: '0990000000', email: '', nacimiento: '2011-01-05', fechaCreacion: '2026-07-19', notas: '' },
  { id: 'c_imp_267', nombre: 'Cristofer Arsentales', telefono: '0990000000', email: '', nacimiento: '2011-02-19', fechaCreacion: '2026-04-12', notas: '' },
  { id: 'c_imp_268', nombre: 'Cristofer Delgado', telefono: '0993364945', email: '', nacimiento: '2010-04-02', fechaCreacion: '2026-08-23', notas: '' },
  { id: 'c_imp_269', nombre: 'Cristofer Huerta', telefono: '0987097844', email: '', nacimiento: '2007-09-03', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_270', nombre: 'Mauricio Padilla', telefono: '0990000000', email: '', nacimiento: '2014-02-05', fechaCreacion: '2026-08-05', notas: '' },
  { id: 'c_imp_271', nombre: 'Cristofer Ortega', telefono: '0990000000', email: '', nacimiento: '2010-12-12', fechaCreacion: '2026-04-06', notas: '' },
  { id: 'c_imp_272', nombre: 'Cristofer Rodriguez', telefono: '0998651414', email: '', nacimiento: '2011-08-25', fechaCreacion: '2026-07-18', notas: '' },
  { id: 'c_imp_273', nombre: 'Cristofer Sotama', telefono: '0986555614', email: '', nacimiento: '2010-01-14', fechaCreacion: '2026-05-07', notas: '' },
  { id: 'c_imp_274', nombre: 'Cristofer Tamay', telefono: '0999055119', email: '', nacimiento: '2009-06-10', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_275', nombre: 'Cristofer Villacis', telefono: '0998637656', email: '', nacimiento: '2009-02-07', fechaCreacion: '2026-06-13', notas: '' },
  { id: 'c_imp_276', nombre: 'Crstian Mayazhungo', telefono: '0995038164', email: '', nacimiento: '2020-10-25', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_277', nombre: 'Cuzco Vasquez', telefono: '0998985224', email: '', nacimiento: '1984-05-04', fechaCreacion: '2026-03-05', notas: '' },
  { id: 'c_imp_278', nombre: 'Damian Castillo', telefono: '0990000000', email: '', nacimiento: '2008-08-05', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_279', nombre: 'Damian Guzman', telefono: '0990000000', email: '', nacimiento: '2009-06-23', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_280', nombre: 'Dani Chima', telefono: '063053389', email: '', nacimiento: '1994-04-04', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_281', nombre: 'Dani Sinchi', telefono: '0997872972', email: '', nacimiento: '2010-08-12', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_282', nombre: 'Daniel', telefono: '0990000000', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_283', nombre: 'Daniel Angamarca', telefono: '0987998694', email: '', nacimiento: '2011-04-26', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_284', nombre: 'Daniel Bermejo', telefono: '0995965110', email: '', nacimiento: '2012-10-26', fechaCreacion: '2026-07-24', notas: '' },
  { id: 'c_imp_285', nombre: 'Daniel Calderon', telefono: '0961803803', email: '', nacimiento: '2012-02-05', fechaCreacion: '2026-07-25', notas: '' },
  { id: 'c_imp_286', nombre: 'Daniel Cambi', telefono: '0990000000', email: '', nacimiento: '2005-06-17', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_287', nombre: 'Daniel Carpio', telefono: '0990796238', email: '', nacimiento: '2009-10-10', fechaCreacion: '2026-05-09', notas: '' },
  { id: 'c_imp_288', nombre: 'Daniel Culala', telefono: '0983089149', email: '', nacimiento: '2010-07-08', fechaCreacion: '2026-05-27', notas: '' },
  { id: 'c_imp_289', nombre: 'Daniel Cungachi', telefono: '0990000000', email: '', nacimiento: '2016-08-28', fechaCreacion: '2026-05-10', notas: '' },
  { id: 'c_imp_290', nombre: 'Daniel Duran', telefono: '0990000000', email: '', nacimiento: '2012-06-23', fechaCreacion: '2026-05-01', notas: '' },
  { id: 'c_imp_291', nombre: 'Daniel Loja', telefono: '0987361874', email: '', nacimiento: '2005-11-28', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_292', nombre: 'Daniel Santander', telefono: '0997948417', email: '', nacimiento: '2009-12-10', fechaCreacion: '2026-05-18', notas: '' },
  { id: 'c_imp_293', nombre: 'Danny Cardenas', telefono: '0979123195', email: '', nacimiento: '2007-12-24', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_294', nombre: 'Danny Garcia', telefono: '0968405384', email: '', nacimiento: '2009-01-09', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_295', nombre: 'Danny Pichazaca', telefono: '0962976659', email: '', nacimiento: '2019-11-25', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_296', nombre: 'Dante Loja', telefono: '0998536391', email: '', nacimiento: '2016-12-02', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_297', nombre: 'Dany Alvarez', telefono: '0990000000', email: '', nacimiento: '2002-06-25', fechaCreacion: '2026-07-21', notas: '' },
  { id: 'c_imp_298', nombre: 'Darwin Cela', telefono: '0984295533', email: '', nacimiento: '2006-04-07', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_299', nombre: 'Darwin Guaman', telefono: '0987559273', email: '', nacimiento: '2008-07-08', fechaCreacion: '2026-07-08', notas: '' },
  { id: 'c_imp_300', nombre: 'Darwin Lema', telefono: '0998123914', email: '', nacimiento: '2009-05-09', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_301', nombre: 'Darwin Zaruma', telefono: '0983280001', email: '', nacimiento: '2008-09-22', fechaCreacion: '2026-05-08', notas: '' },
  { id: 'c_imp_302', nombre: 'David Alvarez', telefono: '0995816329', email: '', nacimiento: '2011-01-14', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_303', nombre: 'David Andrade', telefono: '0979394286', email: '', nacimiento: '2009-09-21', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_304', nombre: 'David Camas', telefono: '0983165261', email: '', nacimiento: '2005-02-11', fechaCreacion: '2026-05-08', notas: '' },
  { id: 'c_imp_305', nombre: 'David Chuqui', telefono: '0995819034', email: '', nacimiento: '1993-08-25', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_306', nombre: 'David Espinoza', telefono: '0988469702', email: '', nacimiento: '2009-08-23', fechaCreacion: '2026-05-23', notas: '' },
  { id: 'c_imp_307', nombre: 'David Fajardo', telefono: '0958763697', email: '', nacimiento: '2006-09-28', fechaCreacion: '2026-07-26', notas: '' },
  { id: 'c_imp_308', nombre: 'David Guaraca', telefono: '0968471879', email: '', nacimiento: '2005-08-15', fechaCreacion: '2026-02-28', notas: '' },
  { id: 'c_imp_309', nombre: 'David Loja', telefono: '0983249497', email: '', nacimiento: '2003-02-23', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_310', nombre: 'David Padilla', telefono: '0998090868', email: '', nacimiento: '2009-05-21', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_311', nombre: 'David Pichazaca', telefono: '0992728687', email: '', nacimiento: '2006-11-26', fechaCreacion: '2026-07-25', notas: '' },
  { id: 'c_imp_312', nombre: 'David Quishpe', telefono: '0984648090', email: '', nacimiento: '2001-09-08', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_313', nombre: 'David Zamora', telefono: '0987365999', email: '', nacimiento: '2011-11-30', fechaCreacion: '2026-05-17', notas: '' },
  { id: 'c_imp_314', nombre: 'Davide Vergara', telefono: '0990000000', email: '', nacimiento: '2002-06-04', fechaCreacion: '2026-05-10', notas: '' },
  { id: 'c_imp_315', nombre: 'Dayro Siguencia', telefono: '09981640456', email: '', nacimiento: '2022-10-18', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_316', nombre: 'Deikin Conejo', telefono: '0962606916', email: '', nacimiento: '2008-10-26', fechaCreacion: '2026-03-23', notas: '' },
  { id: 'c_imp_317', nombre: 'Dennys Lema', telefono: '0958617727', email: '', nacimiento: '2006-11-28', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_318', nombre: 'Dennys Pomavilla', telefono: '0987515265', email: '', nacimiento: '2011-09-25', fechaCreacion: '2026-08-30', notas: '' },
  { id: 'c_imp_319', nombre: 'Dennys Sinche', telefono: '092858996', email: '', nacimiento: '2011-12-26', fechaCreacion: '2026-05-17', notas: '' },
  { id: 'c_imp_320', nombre: 'Dereck Maisa', telefono: '0990000000', email: '', nacimiento: '2021-05-20', fechaCreacion: '2026-09-06', notas: '' },
  { id: 'c_imp_321', nombre: 'Deybi Lopez', telefono: '0979024393', email: '', nacimiento: '2012-01-01', fechaCreacion: '2026-06-21', notas: '' },
  { id: 'c_imp_322', nombre: 'Deyson Cela', telefono: '0987948865', email: '', nacimiento: '2011-03-04', fechaCreacion: '2026-05-04', notas: '' },
  { id: 'c_imp_323', nombre: 'Diego Alvarez', telefono: '0992966632', email: '', nacimiento: '2009-04-21', fechaCreacion: '2026-05-26', notas: '' },
  { id: 'c_imp_324', nombre: 'Diego Andrade', telefono: '0984445981', email: '', nacimiento: '2007-04-11', fechaCreacion: '2026-05-07', notas: '' },
  { id: 'c_imp_325', nombre: 'Diego Duy', telefono: '0987004296', email: '', nacimiento: '2003-04-26', fechaCreacion: '2026-04-19', notas: '' },
  { id: 'c_imp_326', nombre: 'Diego Espinoza', telefono: '0984264046', email: '', nacimiento: '2009-08-17', fechaCreacion: '2026-03-31', notas: '' },
  { id: 'c_imp_327', nombre: 'Diego Guaraca', telefono: '0990000000', email: '', nacimiento: '2011-11-06', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_328', nombre: 'Diego Pillaga', telefono: '0987862324', email: '', nacimiento: '2006-06-30', fechaCreacion: '2026-07-09', notas: '' },
  { id: 'c_imp_329', nombre: 'Diego Tenesaca', telefono: '0999397107', email: '', nacimiento: '2008-07-05', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_330', nombre: 'Dilan Espinoza', telefono: '0979330065', email: '', nacimiento: '2010-12-15', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_331', nombre: 'Dilan Larco', telefono: '0983128713', email: '', nacimiento: '2013-01-12', fechaCreacion: '2026-05-29', notas: '' },
  { id: 'c_imp_332', nombre: 'Dilan Nivelo', telefono: '0995618744', email: '', nacimiento: '2013-05-22', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_333', nombre: 'Dominic Quito', telefono: '0995768275', email: '', nacimiento: '2015-12-04', fechaCreacion: '2026-05-11', notas: '' },
  { id: 'c_imp_334', nombre: 'Dominic Tamay', telefono: '0992793979', email: '', nacimiento: '2015-01-16', fechaCreacion: '2026-05-11', notas: '' },
  { id: 'c_imp_335', nombre: 'Doston Sanchez', telefono: '0990000000', email: '', nacimiento: '2002-12-28', fechaCreacion: '2026-03-15', notas: '' },
  { id: 'c_imp_336', nombre: 'Dylan Medina', telefono: '0990000000', email: '', nacimiento: '2023-11-16', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_337', nombre: 'Dylan Nieto', telefono: '0987160900', email: '', nacimiento: '2010-02-02', fechaCreacion: '2026-03-13', notas: '' },
  { id: 'c_imp_338', nombre: 'Dylan Ñieto', telefono: '0990000000', email: '', nacimiento: '2008-02-04', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_339', nombre: 'Dylan Paguay', telefono: '0987892828', email: '', nacimiento: '2010-11-16', fechaCreacion: '2026-07-01', notas: '' },
  { id: 'c_imp_340', nombre: 'Dylan Tenemasa', telefono: '0990000000', email: '', nacimiento: '2015-05-17', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_341', nombre: 'Ector Moncay', telefono: '0987321332', email: '', nacimiento: '2007-03-08', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_342', nombre: 'Eddy Gomez', telefono: '0987912033', email: '', nacimiento: '2009-12-30', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_343', nombre: 'Edgar Caizan', telefono: '0969257977', email: '', nacimiento: '2024-02-07', fechaCreacion: '2026-05-05', notas: '' },
  { id: 'c_imp_344', nombre: 'Edgar Chafla', telefono: '0983825478', email: '', nacimiento: '1997-07-05', fechaCreacion: '2026-05-22', notas: '' },
  { id: 'c_imp_345', nombre: 'Edgar Fernandez', telefono: '0999240260', email: '', nacimiento: '2000-08-05', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_346', nombre: 'Edgar Granda', telefono: '0998289715', email: '', nacimiento: '2012-07-12', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_347', nombre: 'Edgar Lala', telefono: '0990000000', email: '', nacimiento: '2006-08-02', fechaCreacion: '2026-03-04', notas: '' },
  { id: 'c_imp_348', nombre: 'Edgar Loja', telefono: '0998647742', email: '', nacimiento: '2007-09-14', fechaCreacion: '2026-06-26', notas: '' },
  { id: 'c_imp_349', nombre: 'Edgar Zhau', telefono: '0981137623', email: '', nacimiento: '1996-01-05', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_350', nombre: 'Edguardo Ochoa', telefono: '0990000000', email: '', nacimiento: '2009-03-22', fechaCreacion: '2026-06-27', notas: '' },
  { id: 'c_imp_351', nombre: 'Edison Andrade', telefono: '0987719710', email: '', nacimiento: '1993-08-06', fechaCreacion: '2026-04-22', notas: '' },
  { id: 'c_imp_352', nombre: 'Edison Caguana', telefono: '0990945367', email: '', nacimiento: '2008-07-02', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_353', nombre: 'Edison Espinoza', telefono: '0998129565', email: '', nacimiento: '2003-08-30', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_354', nombre: 'Edison Lala', telefono: '0958885087', email: '', nacimiento: '2008-02-04', fechaCreacion: '2026-09-16', notas: '' },
  { id: 'c_imp_355', nombre: 'Edison Loja', telefono: '0995241554', email: '', nacimiento: '2011-05-25', fechaCreacion: '2026-06-14', notas: '' },
  { id: 'c_imp_356', nombre: 'Edison Romero', telefono: '0984277273', email: '', nacimiento: '2007-02-22', fechaCreacion: '2026-03-15', notas: '' },
  { id: 'c_imp_357', nombre: 'Edison Saeteros', telefono: '0979381791', email: '', nacimiento: '2007-10-22', fechaCreacion: '2026-03-13', notas: '' },
  { id: 'c_imp_358', nombre: 'Edison Siguencia', telefono: '0990000000', email: '', nacimiento: '2001-06-03', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_359', nombre: 'Eduardo Acan', telefono: '0990000000', email: '', nacimiento: '2007-05-19', fechaCreacion: '2026-05-24', notas: '' },
  { id: 'c_imp_360', nombre: 'Eduardo Bernal', telefono: '0979580999', email: '', nacimiento: '2006-04-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_361', nombre: 'Eduardo Lema', telefono: '0979366152', email: '', nacimiento: '2010-05-25', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_362', nombre: 'Edwin Cabrera', telefono: '0990000000', email: '', nacimiento: '2012-05-15', fechaCreacion: '2026-03-29', notas: '' },
  { id: 'c_imp_363', nombre: 'Edwin Cantos', telefono: '0984470085', email: '', nacimiento: '2009-03-26', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_364', nombre: 'Edwin Huerta', telefono: '0992709882', email: '', nacimiento: '2009-02-02', fechaCreacion: '2026-03-01', notas: '' },
  { id: 'c_imp_365', nombre: 'Edwin Idrogo', telefono: '0990000000', email: '', nacimiento: '2005-12-03', fechaCreacion: '2026-06-09', notas: '' },
  { id: 'c_imp_366', nombre: 'Edwin Lema', telefono: '0990000000', email: '', nacimiento: '2013-03-13', fechaCreacion: '2026-03-15', notas: '' },
  { id: 'c_imp_367', nombre: 'Edwin Mazapanta', telefono: '0990000000', email: '', nacimiento: '2006-11-13', fechaCreacion: '2026-03-12', notas: '' },
  { id: 'c_imp_368', nombre: 'Edwin Vinicio', telefono: '0973056325', email: '', nacimiento: '2007-09-16', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_369', nombre: 'Efrain Altamirano', telefono: '0993366879', email: '', nacimiento: '2007-12-05', fechaCreacion: '2026-05-15', notas: '' },
  { id: 'c_imp_370', nombre: 'Efrain Daquilema', telefono: '0990000000', email: '', nacimiento: '1996-06-07', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_371', nombre: 'Efrain Pino', telefono: '0987409839', email: '', nacimiento: '2013-02-24', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_372', nombre: 'Elias Castro', telefono: '0990000000', email: '', nacimiento: '2010-04-16', fechaCreacion: '2026-03-12', notas: '' },
  { id: 'c_imp_373', nombre: 'Elkyn Pillaga', telefono: '0984746094', email: '', nacimiento: '2011-08-30', fechaCreacion: '2026-07-01', notas: '' },
  { id: 'c_imp_374', nombre: 'Elvis Tapay', telefono: '0981812162', email: '', nacimiento: '2009-02-13', fechaCreacion: '2026-05-17', notas: '' },
  { id: 'c_imp_375', nombre: 'Emanuel Barhaona', telefono: '0983234359', email: '', nacimiento: '2009-08-13', fechaCreacion: '2026-09-24', notas: '' },
  { id: 'c_imp_376', nombre: 'Emanuel Encalada', telefono: '0987010043', email: '', nacimiento: '2009-12-25', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_377', nombre: 'Emilio Garzon', telefono: '0987775450', email: '', nacimiento: '2011-10-22', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_378', nombre: 'Emnuel Correa', telefono: '0990000000', email: '', nacimiento: '2000-12-23', fechaCreacion: '2026-03-02', notas: '' },
  { id: 'c_imp_379', nombre: 'Enrique Fernandez', telefono: '0990000000', email: '', nacimiento: '2020-12-18', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_380', nombre: 'Erich Gauancela', telefono: '0999012103', email: '', nacimiento: '2004-10-04', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_381', nombre: 'Erick Alvarez', telefono: '0968720892', email: '', nacimiento: '2008-08-13', fechaCreacion: '2026-07-08', notas: '' },
  { id: 'c_imp_382', nombre: 'Erick Andrade', telefono: '0990000000', email: '', nacimiento: '2010-09-16', fechaCreacion: '2026-03-15', notas: '' },
  { id: 'c_imp_383', nombre: 'Erick Camas', telefono: '0998932718', email: '', nacimiento: '2005-05-12', fechaCreacion: '2026-07-25', notas: '' },
  { id: 'c_imp_384', nombre: 'Erick Guaman', telefono: '0990000000', email: '', nacimiento: '2012-02-07', fechaCreacion: '2026-05-30', notas: '' },
  { id: 'c_imp_385', nombre: 'Erick Lala', telefono: '0968269365', email: '', nacimiento: '2006-01-21', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_386', nombre: 'Erick Mainato', telefono: '0991567603', email: '', nacimiento: '2010-01-31', fechaCreacion: '2026-07-19', notas: '' },
  { id: 'c_imp_387', nombre: 'Erick Montero', telefono: '0984654488', email: '', nacimiento: '2011-06-24', fechaCreacion: '2026-04-12', notas: '' },
  { id: 'c_imp_388', nombre: 'Erick Montero', telefono: '0983324199', email: '', nacimiento: '2011-10-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_389', nombre: 'Erick Palag', telefono: '0990000000', email: '', nacimiento: '2011-05-22', fechaCreacion: '2026-07-23', notas: '' },
  { id: 'c_imp_390', nombre: 'Erick Tenezaca', telefono: '0984457540', email: '', nacimiento: '2011-06-02', fechaCreacion: '2026-08-05', notas: '' },
  { id: 'c_imp_391', nombre: 'Erik Angamarca', telefono: '0958620663', email: '', nacimiento: '2006-02-26', fechaCreacion: '2026-04-04', notas: '' },
  { id: 'c_imp_392', nombre: 'Erik Mayancela', telefono: '0984353843', email: '', nacimiento: '2011-01-23', fechaCreacion: '2026-04-08', notas: '' },
  { id: 'c_imp_393', nombre: 'Erik Solorsano', telefono: '0990000000', email: '', nacimiento: '2012-12-07', fechaCreacion: '2026-05-03', notas: '' },
  { id: 'c_imp_394', nombre: 'Ernan Calle', telefono: '0990000000', email: '', nacimiento: '2014-02-02', fechaCreacion: '2026-06-08', notas: '' },
  { id: 'c_imp_395', nombre: 'Ernesto Lala', telefono: '0968564987', email: '', nacimiento: '2003-01-05', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_396', nombre: 'Esteban Muñoz', telefono: '0995988161', email: '', nacimiento: '2012-02-19', fechaCreacion: '2026-09-12', notas: '' },
  { id: 'c_imp_397', nombre: 'Esteban Ochoa', telefono: '0995867613', email: '', nacimiento: '2010-02-08', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_398', nombre: 'Esteban Yamba', telefono: '0958944663', email: '', nacimiento: '2007-03-15', fechaCreacion: '2026-02-22', notas: '' },
  { id: 'c_imp_399', nombre: 'Estiven Chimborazo', telefono: '0990000000', email: '', nacimiento: '2007-09-21', fechaCreacion: '2026-03-08', notas: '' },
  { id: 'c_imp_400', nombre: 'Estiven Chimborazo', telefono: '0990000000', email: '', nacimiento: '2009-08-06', fechaCreacion: '2026-08-30', notas: '' },
  { id: 'c_imp_401', nombre: 'Estiven Meza', telefono: '0992731859', email: '', nacimiento: '1997-12-12', fechaCreacion: '2026-09-06', notas: '' },
  { id: 'c_imp_402', nombre: 'Exiquiel Pichazaca', telefono: '0990000000', email: '', nacimiento: '2001-01-20', fechaCreacion: '2026-03-23', notas: '' },
  { id: 'c_imp_403', nombre: 'Eydan Guaman', telefono: '0990000000', email: '', nacimiento: '2013-04-26', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_404', nombre: 'Fabian Urrego', telefono: '0992592045', email: '', nacimiento: '2005-06-03', fechaCreacion: '2026-04-27', notas: '' },
  { id: 'c_imp_405', nombre: 'Fabricio Contreras', telefono: '0990000000', email: '', nacimiento: '1989-01-18', fechaCreacion: '2026-02-28', notas: '' },
  { id: 'c_imp_406', nombre: 'Fabricio Torres', telefono: '0990000000', email: '', nacimiento: '2008-12-01', fechaCreacion: '2026-06-07', notas: '' },
  { id: 'c_imp_407', nombre: 'Fabricio Verdugo', telefono: '0979238899', email: '', nacimiento: '2012-05-21', fechaCreacion: '2026-07-24', notas: '' },
  { id: 'c_imp_408', nombre: 'Fernando Andrade', telefono: '0984686088', email: '', nacimiento: '2006-02-08', fechaCreacion: '2026-04-29', notas: '' },
  { id: 'c_imp_409', nombre: 'Fernando Caguana', telefono: '0999945047', email: '', nacimiento: '2006-10-31', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_410', nombre: 'Fernando Correa', telefono: '0998227357', email: '', nacimiento: '2011-02-10', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_411', nombre: 'Fernando Garcia', telefono: '09821228266', email: '', nacimiento: '2000-01-19', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_412', nombre: 'Fernando Lala', telefono: '0995626889', email: '', nacimiento: '2009-10-09', fechaCreacion: '2026-09-06', notas: '' },
  { id: 'c_imp_413', nombre: 'Fernando Naula', telefono: '0996161916', email: '', nacimiento: '2011-09-16', fechaCreacion: '2026-06-14', notas: '' },
  { id: 'c_imp_414', nombre: 'Fernando Neira', telefono: '0984274950', email: '', nacimiento: '2004-10-02', fechaCreacion: '2026-07-20', notas: '' },
  { id: 'c_imp_415', nombre: 'Fernando Pastuisaca', telefono: '0984757934', email: '', nacimiento: '1995-05-23', fechaCreacion: '2026-07-04', notas: '' },
  { id: 'c_imp_416', nombre: 'Fernando Sanchez', telefono: '0990000000', email: '', nacimiento: '2014-09-19', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_417', nombre: 'Fidel Loja', telefono: '0987233037', email: '', nacimiento: '2006-01-02', fechaCreacion: '2026-03-06', notas: '' },
  { id: 'c_imp_418', nombre: 'Frabian Rodas', telefono: '0999377736', email: '', nacimiento: '1978-03-28', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_419', nombre: 'Francis Andrade', telefono: '0993235094', email: '', nacimiento: '2010-09-16', fechaCreacion: '2026-06-01', notas: '' },
  { id: 'c_imp_420', nombre: 'Francisco Mayancela', telefono: '0983718903', email: '', nacimiento: '2008-01-21', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_421', nombre: 'Franco Perez', telefono: '0987401628', email: '', nacimiento: '2013-02-11', fechaCreacion: '2026-03-24', notas: '' },
  { id: 'c_imp_422', nombre: 'Frank Chicayza', telefono: '0990000000', email: '', nacimiento: '2011-01-14', fechaCreacion: '2026-02-24', notas: '' },
  { id: 'c_imp_423', nombre: 'Franklin Allaico', telefono: '0984736862', email: '', nacimiento: '2009-04-08', fechaCreacion: '2026-04-24', notas: '' },
  { id: 'c_imp_424', nombre: 'Franklin Campoverde', telefono: '0990000000', email: '', nacimiento: '1993-08-21', fechaCreacion: '2026-03-13', notas: '' },
  { id: 'c_imp_425', nombre: 'Franklin Duy', telefono: '0998229851', email: '', nacimiento: '2002-03-15', fechaCreacion: '2026-04-05', notas: '' },
  { id: 'c_imp_426', nombre: 'Franklin Guaman', telefono: '0962922217', email: '', nacimiento: '2010-09-10', fechaCreacion: '2026-04-26', notas: '' },
  { id: 'c_imp_427', nombre: 'Franklin Guaman', telefono: '0994392343', email: '', nacimiento: '2009-09-05', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_428', nombre: 'Franklin Lala', telefono: '0968196912', email: '', nacimiento: '1998-06-20', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_429', nombre: 'Franklin Lala', telefono: '0983991456', email: '', nacimiento: '2006-12-04', fechaCreacion: '2026-03-04', notas: '' },
  { id: 'c_imp_430', nombre: 'Franklin Lala Delgado', telefono: '0967424881', email: '', nacimiento: '2009-04-11', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_431', nombre: 'Franklin Larco', telefono: '0992754244', email: '', nacimiento: '2005-11-30', fechaCreacion: '2026-05-22', notas: '' },
  { id: 'c_imp_432', nombre: 'Franklin Quito', telefono: '0987996424', email: '', nacimiento: '2011-09-18', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_433', nombre: 'Franklin Solorzano', telefono: '098855233', email: '', nacimiento: '2004-09-22', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_434', nombre: 'Franklin Tenezaca', telefono: '0990000000', email: '', nacimiento: '2010-02-10', fechaCreacion: '2026-10-04', notas: '' },
  { id: 'c_imp_435', nombre: 'Frankliyn Guaman', telefono: '09994392343', email: '', nacimiento: '2009-09-05', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_436', nombre: 'Freddy Medina', telefono: '0963855540', email: '', nacimiento: '1995-03-24', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_437', nombre: 'Freddy Pulla', telefono: '0958681629', email: '', nacimiento: '2001-12-17', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_438', nombre: 'Freddy Saeteros', telefono: '0995934573', email: '', nacimiento: '1988-11-09', fechaCreacion: '2026-07-26', notas: '' },
  { id: 'c_imp_439', nombre: 'Freddy Zamora', telefono: '0992979750', email: '', nacimiento: '2008-03-03', fechaCreacion: '2026-04-10', notas: '' },
  { id: 'c_imp_440', nombre: 'Gabriel Saeteros', telefono: '0998915346', email: '', nacimiento: '1998-12-07', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_441', nombre: 'Gabriel Simbaina', telefono: '0980854217', email: '', nacimiento: '1985-11-12', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_442', nombre: 'Galo Espinoza', telefono: '0998803982', email: '', nacimiento: '2012-06-27', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_443', nombre: 'Geovanny Lala', telefono: '0990000000', email: '', nacimiento: '2004-05-15', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_444', nombre: 'Gerardo Loja', telefono: '0995757976', email: '', nacimiento: '2006-07-18', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_445', nombre: 'Giannill Cuicas', telefono: '0959922053', email: '', nacimiento: '2020-08-20', fechaCreacion: '2026-04-05', notas: '' },
  { id: 'c_imp_446', nombre: 'Gillermo Martinez', telefono: '0992626131', email: '', nacimiento: '1971-03-24', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_447', nombre: 'Grabiel Simbaina', telefono: '0983470439', email: '', nacimiento: '2003-12-25', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_448', nombre: 'Griesman Mainato', telefono: '0990000000', email: '', nacimiento: '2021-07-25', fechaCreacion: '2026-06-14', notas: '' },
  { id: 'c_imp_449', nombre: 'Guillermo Pingil', telefono: '0995117990', email: '', nacimiento: '1974-08-13', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_450', nombre: 'Hayder Maldonado', telefono: '0987182423', email: '', nacimiento: '2004-12-29', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_451', nombre: 'Hector Cela', telefono: '0992517799', email: '', nacimiento: '2010-06-19', fechaCreacion: '2026-05-09', notas: '' },
  { id: 'c_imp_452', nombre: 'Hector Romero', telefono: '0988257126', email: '', nacimiento: '2011-03-22', fechaCreacion: '2026-06-14', notas: '' },
  { id: 'c_imp_453', nombre: 'Hector Sanchez', telefono: '0984142125', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_454', nombre: 'Hendri Guallpa', telefono: '0983535540', email: '', nacimiento: '2010-05-10', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_455', nombre: 'Hendri Pizarro', telefono: '0998613098', email: '', nacimiento: '2009-09-09', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_456', nombre: 'Hendry Llugsa', telefono: '0985030307', email: '', nacimiento: '2004-06-15', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_457', nombre: 'Hendry Tenemaza', telefono: '0983657387', email: '', nacimiento: '2000-06-19', fechaCreacion: '2026-09-06', notas: '' },
  { id: 'c_imp_458', nombre: 'Henry Romero', telefono: '0999291077', email: '', nacimiento: '2007-07-19', fechaCreacion: '2026-04-04', notas: '' },
  { id: 'c_imp_459', nombre: 'Hernan Yaucan', telefono: '0984479588', email: '', nacimiento: '1997-03-24', fechaCreacion: '2026-04-06', notas: '' },
  { id: 'c_imp_460', nombre: 'Isaac Lazo', telefono: '0990000000', email: '', nacimiento: '2012-01-31', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_461', nombre: 'Isacc Mayancela', telefono: '0990000000', email: '', nacimiento: '2001-10-03', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_462', nombre: 'Ismael Camas', telefono: '0990000000', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-03-08', notas: '' },
  { id: 'c_imp_463', nombre: 'Ismael Jaro', telefono: '0969167775', email: '', nacimiento: '1999-04-25', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_464', nombre: 'Israel Meza', telefono: '0997086373', email: '', nacimiento: '2001-02-10', fechaCreacion: '2026-06-05', notas: '' },
  { id: 'c_imp_465', nombre: 'Israel Pillaga', telefono: '0987046669', email: '', nacimiento: '1998-10-06', fechaCreacion: '2026-06-15', notas: '' },
  { id: 'c_imp_466', nombre: 'Italo Calle', telefono: '0995660602', email: '', nacimiento: '2007-12-25', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_467', nombre: 'Ivan Lema', telefono: '0983831872', email: '', nacimiento: '2008-04-28', fechaCreacion: '2026-09-24', notas: '' },
  { id: 'c_imp_468', nombre: 'Ivan Mayancela', telefono: '0992835292', email: '', nacimiento: '2000-04-06', fechaCreacion: '2026-03-18', notas: '' },
  { id: 'c_imp_469', nombre: 'Jacob Yupangui', telefono: '0990000000', email: '', nacimiento: '2013-09-30', fechaCreacion: '2026-09-29', notas: '' },
  { id: 'c_imp_470', nombre: 'Jaime Calderon', telefono: '0984172596', email: '', nacimiento: '2009-03-15', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_471', nombre: 'Jaime Idrovo', telefono: '0983515110', email: '', nacimiento: '2002-08-16', fechaCreacion: '2026-06-07', notas: '' },
  { id: 'c_imp_472', nombre: 'Jaime Molina', telefono: '0999815822', email: '', nacimiento: '2010-05-28', fechaCreacion: '2026-05-07', notas: '' },
  { id: 'c_imp_473', nombre: 'Jaime Solano', telefono: '096799908', email: '', nacimiento: '1991-10-10', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_474', nombre: 'Jaime Zhinin', telefono: '0968639412', email: '', nacimiento: '1995-07-12', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_475', nombre: 'Jair Cagua', telefono: '0979754561', email: '', nacimiento: '1996-05-15', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_476', nombre: 'Jairo De La Cruz', telefono: '0999066151', email: '', nacimiento: '2005-06-21', fechaCreacion: '2026-09-23', notas: '' },
  { id: 'c_imp_477', nombre: 'Jairo Ortiz', telefono: '0991600561', email: '', nacimiento: '2009-11-27', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_478', nombre: 'Jairo Solorzano', telefono: '0963035219', email: '', nacimiento: '2003-01-17', fechaCreacion: '2026-04-30', notas: '' },
  { id: 'c_imp_479', nombre: 'James Solano', telefono: '0990000000', email: '', nacimiento: '2016-11-16', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_480', nombre: 'Jason Loja', telefono: '0987442045', email: '', nacimiento: '2011-12-16', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_481', nombre: 'Jausto Loja', telefono: '0999013186', email: '', nacimiento: '1998-02-25', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_482', nombre: 'Javier Caguana', telefono: '099813845', email: '', nacimiento: '2004-03-06', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_483', nombre: 'Javier Chirino', telefono: '0987320776', email: '', nacimiento: '2010-05-19', fechaCreacion: '2026-08-05', notas: '' },
  { id: 'c_imp_484', nombre: 'Javier Chuchuca', telefono: '0984378897', email: '', nacimiento: '2005-08-17', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_485', nombre: 'Javier Ortiz', telefono: '0958930667', email: '', nacimiento: '2009-07-27', fechaCreacion: '2026-05-31', notas: '' },
  { id: 'c_imp_486', nombre: 'Javier Tenezaca', telefono: '0990443701', email: '', nacimiento: '2005-07-16', fechaCreacion: '2026-03-06', notas: '' },
  { id: 'c_imp_487', nombre: 'Javier Yamba', telefono: '0990000000', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-03-07', notas: '' },
  { id: 'c_imp_488', nombre: 'Jayde Amaguaña', telefono: '0988971551', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_489', nombre: 'Jaylli Aguayza', telefono: '0998064793', email: '', nacimiento: '2010-12-20', fechaCreacion: '2026-07-15', notas: '' },
  { id: 'c_imp_490', nombre: 'Jean Pier Acero', telefono: '0984926657', email: '', nacimiento: '2012-12-27', fechaCreacion: '2026-09-25', notas: '' },
  { id: 'c_imp_491', nombre: 'Jeferson Caceres', telefono: '0981222876', email: '', nacimiento: '1997-01-16', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_492', nombre: 'Jeferson Ordoñez', telefono: '0995412627', email: '', nacimiento: '1992-02-19', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_493', nombre: 'Jeferson Ortiz', telefono: '0967735033', email: '', nacimiento: '2001-06-28', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_494', nombre: 'Jeferson Padilla', telefono: '0998476559', email: '', nacimiento: '2009-04-04', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_495', nombre: 'Jeferson Paguay', telefono: '0990000000', email: '', nacimiento: '2004-05-29', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_496', nombre: 'Jeferson Romero', telefono: '0997327139', email: '', nacimiento: '2005-07-06', fechaCreacion: '2026-02-28', notas: '' },
  { id: 'c_imp_497', nombre: 'Jefferson Consttante', telefono: '0990000000', email: '', nacimiento: '2013-10-12', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_498', nombre: 'Jeicob Soliz', telefono: '0968022475', email: '', nacimiento: '2011-11-08', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_499', nombre: 'Jerry Huachichullca', telefono: '06125836513', email: '', nacimiento: '2012-10-26', fechaCreacion: '2026-06-21', notas: '' },
  { id: 'c_imp_500', nombre: 'Jesulin Chimbo', telefono: '0992697578', email: '', nacimiento: '2011-01-04', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_501', nombre: 'Jesus Ochoa', telefono: '0984925714', email: '', nacimiento: '2008-03-22', fechaCreacion: '2026-05-30', notas: '' },
  { id: 'c_imp_502', nombre: 'Jgon Sotamba', telefono: '0983578798', email: '', nacimiento: '2010-08-26', fechaCreacion: '2026-07-05', notas: '' },
  { id: 'c_imp_503', nombre: 'Jhalmar Maurizaca', telefono: '0990000000', email: '', nacimiento: '2010-02-06', fechaCreacion: '2026-05-04', notas: '' },
  { id: 'c_imp_504', nombre: 'Jheyco Amaguaña', telefono: '0997373728', email: '', nacimiento: '2012-09-12', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_505', nombre: 'Jhimmy Siguencia', telefono: '0979024735', email: '', nacimiento: '2006-10-24', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_506', nombre: 'Jhoan Ortega', telefono: '0987450426', email: '', nacimiento: '2015-08-05', fechaCreacion: '2026-08-05', notas: '' },
  { id: 'c_imp_507', nombre: 'Jhon Chicayza', telefono: '0990000000', email: '', nacimiento: '2012-05-19', fechaCreacion: '2026-02-24', notas: '' },
  { id: 'c_imp_508', nombre: 'Jhon Quizhpe', telefono: '0962590086', email: '', nacimiento: '2012-01-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_509', nombre: 'Jhon Acero', telefono: '0967405653', email: '', nacimiento: '2009-01-11', fechaCreacion: '2026-09-24', notas: '' },
  { id: 'c_imp_510', nombre: 'Jhon Barros', telefono: '0994485163', email: '', nacimiento: '1996-09-23', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_511', nombre: 'Jhon Huerta', telefono: '0984143739', email: '', nacimiento: '2010-02-02', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_512', nombre: 'Jhon Lema', telefono: '0990000000', email: '', nacimiento: '2007-07-28', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_513', nombre: 'Jhon Mishirunbay', telefono: '0984992383', email: '', nacimiento: '2002-11-07', fechaCreacion: '2026-05-10', notas: '' },
  { id: 'c_imp_514', nombre: 'Jhon Tacury', telefono: '0998432726', email: '', nacimiento: '2009-11-26', fechaCreacion: '2026-06-14', notas: '' },
  { id: 'c_imp_515', nombre: 'Jhon Tenelema', telefono: '0990000000', email: '', nacimiento: '2010-11-16', fechaCreacion: '2026-06-07', notas: '' },
  { id: 'c_imp_516', nombre: 'Jhon Verdezota', telefono: '0991393210', email: '', nacimiento: '2005-04-12', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_517', nombre: 'Jhon Verdugo', telefono: '0987564959', email: '', nacimiento: '2000-06-23', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_518', nombre: 'Jhon Yaucan', telefono: '0996689337', email: '', nacimiento: '2008-04-08', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_519', nombre: 'Jhonatan Cabrera', telefono: '0990000000', email: '', nacimiento: '2009-09-30', fechaCreacion: '2026-03-29', notas: '' },
  { id: 'c_imp_520', nombre: 'Jhonatan Cerrano', telefono: '0984260491', email: '', nacimiento: '2016-06-02', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_521', nombre: 'Jhonatan Duy', telefono: '0995083332', email: '', nacimiento: '2003-11-02', fechaCreacion: '2026-08-31', notas: '' },
  { id: 'c_imp_522', nombre: 'Jhonatan Garcia', telefono: '0990000000', email: '', nacimiento: '1998-08-20', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_523', nombre: 'Jhonatan Granda', telefono: '0982656193', email: '', nacimiento: '2009-08-26', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_524', nombre: 'Jhonatan Morocho', telefono: '0995055477', email: '', nacimiento: '1999-06-08', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_525', nombre: 'Jhonatan Naula', telefono: '0998606481', email: '', nacimiento: '2007-11-17', fechaCreacion: '2026-07-19', notas: '' },
  { id: 'c_imp_526', nombre: 'Jhonatan Ojeda', telefono: '0995948469', email: '', nacimiento: '2002-03-22', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_527', nombre: 'Jhonatan Quindi', telefono: '0984484768', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-05-06', notas: '' },
  { id: 'c_imp_528', nombre: 'Jhonatan Sancan', telefono: '0990000000', email: '', nacimiento: '2012-01-22', fechaCreacion: '2026-06-08', notas: '' },
  { id: 'c_imp_529', nombre: 'Jhonny Bustamante', telefono: '0987607714', email: '', nacimiento: '2008-03-13', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_530', nombre: 'Jimmy Lala', telefono: '0990000000', email: '', nacimiento: '2003-12-25', fechaCreacion: '2026-07-12', notas: '' },
  { id: 'c_imp_531', nombre: 'Jimmy Simbaina', telefono: '0990000000', email: '', nacimiento: '2010-06-23', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_532', nombre: 'Joan Morocho', telefono: '0990000000', email: '', nacimiento: '2011-10-13', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_533', nombre: 'Joaquin Espinoza', telefono: '0990000000', email: '', nacimiento: '2017-08-10', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_534', nombre: 'Joel Cruz', telefono: '0984305044', email: '', nacimiento: '2004-02-13', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_535', nombre: 'Joel Espinoza', telefono: '0984171067', email: '', nacimiento: '2009-05-22', fechaCreacion: '2026-07-26', notas: '' },
  { id: 'c_imp_536', nombre: 'Joel Montenegro', telefono: '0990000000', email: '', nacimiento: '2008-06-24', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_537', nombre: 'Joel Paredes', telefono: '0962849303', email: '', nacimiento: '2012-04-29', fechaCreacion: '2026-09-24', notas: '' },
  { id: 'c_imp_538', nombre: 'Joel Pilla', telefono: '0990000000', email: '', nacimiento: '2008-11-07', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_539', nombre: 'Joel Remache', telefono: '0990000000', email: '', nacimiento: '2016-10-24', fechaCreacion: '2026-07-19', notas: '' },
  { id: 'c_imp_540', nombre: 'Joel Sarmiento', telefono: '0980257480', email: '', nacimiento: '2010-03-12', fechaCreacion: '2026-04-11', notas: '' },
  { id: 'c_imp_541', nombre: 'Joel Tamay', telefono: '0990000000', email: '', nacimiento: '2012-10-06', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_542', nombre: 'Jofre Ortega', telefono: '0990000000', email: '', nacimiento: '2009-02-26', fechaCreacion: '2026-03-06', notas: '' },
  { id: 'c_imp_543', nombre: 'Jofre Paucar', telefono: '0990000000', email: '', nacimiento: '2008-10-30', fechaCreacion: '2026-04-28', notas: '' },
  { id: 'c_imp_544', nombre: 'John Caizan', telefono: '0990000000', email: '', nacimiento: '1999-12-06', fechaCreacion: '2026-05-05', notas: '' },
  { id: 'c_imp_545', nombre: 'John Dultan', telefono: '0998271275', email: '', nacimiento: '2007-03-29', fechaCreacion: '2026-03-22', notas: '' },
  { id: 'c_imp_546', nombre: 'John Ramiez', telefono: '0932549928', email: '', nacimiento: '2006-05-03', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_547', nombre: 'John Urguiles', telefono: '0987059870', email: '', nacimiento: '2004-06-25', fechaCreacion: '2026-07-23', notas: '' },
  { id: 'c_imp_548', nombre: 'Johny Huerta', telefono: '0984108837', email: '', nacimiento: '2009-06-17', fechaCreacion: '2026-05-17', notas: '' },
  { id: 'c_imp_549', nombre: 'Jonatan Cauana', telefono: '0985657591', email: '', nacimiento: '2010-09-02', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_550', nombre: 'Jonatan Loja', telefono: '0967276534', email: '', nacimiento: '1997-08-08', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_551', nombre: 'Jonatan Serrano', telefono: '0990000000', email: '', nacimiento: '2016-06-02', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_552', nombre: 'Jonathan Allaico', telefono: '0984777136', email: '', nacimiento: '2010-05-23', fechaCreacion: '2026-04-21', notas: '' },
  { id: 'c_imp_553', nombre: 'Jonathan Pomavilla', telefono: '0969099976', email: '', nacimiento: '2008-08-21', fechaCreacion: '2026-09-06', notas: '' },
  { id: 'c_imp_554', nombre: 'Jonathan Puli', telefono: '0987734294', email: '', nacimiento: '2010-01-24', fechaCreacion: '2026-04-13', notas: '' },
  { id: 'c_imp_555', nombre: 'Jonathan Yaguache', telefono: '0987341691', email: '', nacimiento: '2017-06-10', fechaCreacion: '2026-04-09', notas: '' },
  { id: 'c_imp_556', nombre: 'Jonathan Zhinin', telefono: '0990000000', email: '', nacimiento: '2012-07-29', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_557', nombre: 'Jonnatan Valdez', telefono: '0995931393', email: '', nacimiento: '2002-03-01', fechaCreacion: '2026-03-01', notas: '' },
  { id: 'c_imp_558', nombre: 'Jonnathan', telefono: '0967010349', email: '', nacimiento: '2009-03-30', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_559', nombre: 'Jonnathan Yamasqui', telefono: '0990000000', email: '', nacimiento: '2010-05-04', fechaCreacion: '2026-04-29', notas: '' },
  { id: 'c_imp_560', nombre: 'Jonnathan Zhinin', telefono: '0979017490', email: '', nacimiento: '1997-07-29', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_561', nombre: 'Jordan Duy', telefono: '0990000000', email: '', nacimiento: '2013-04-20', fechaCreacion: '2026-05-17', notas: '' },
  { id: 'c_imp_562', nombre: 'Jordan Cela', telefono: '0990000000', email: '', nacimiento: '2009-06-03', fechaCreacion: '2026-05-10', notas: '' },
  { id: 'c_imp_563', nombre: 'Jordan Quishpe', telefono: '0985023578', email: '', nacimiento: '2010-12-02', fechaCreacion: '2026-05-10', notas: '' },
  { id: 'c_imp_564', nombre: 'Jordan Quito', telefono: '0979786691', email: '', nacimiento: '2010-04-26', fechaCreacion: '2026-05-26', notas: '' },
  { id: 'c_imp_565', nombre: 'Jordy Chimbo', telefono: '0987831245', email: '', nacimiento: '2011-10-07', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_566', nombre: 'Jordy Leon', telefono: '0990000000', email: '', nacimiento: '2010-12-31', fechaCreacion: '2026-04-24', notas: '' },
  { id: 'c_imp_567', nombre: 'Jordy Vega', telefono: '0987757414', email: '', nacimiento: '2004-05-31', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_568', nombre: 'Jorge Cusco', telefono: '0984270576', email: '', nacimiento: '1991-05-02', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_569', nombre: 'Jorge Guaman', telefono: '0995188316', email: '', nacimiento: '2010-03-13', fechaCreacion: '2026-05-17', notas: '' },
  { id: 'c_imp_570', nombre: 'Jorge Ordoñez', telefono: '0993718620', email: '', nacimiento: '2012-09-18', fechaCreacion: '2026-05-10', notas: '' },
  { id: 'c_imp_571', nombre: 'Jorge Pomavilla', telefono: '0995965915', email: '', nacimiento: '2008-07-10', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_572', nombre: 'Jorge Santa Cruz', telefono: '0979136071', email: '', nacimiento: '1994-08-21', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_573', nombre: 'Jorge Serpa', telefono: '0996305004', email: '', nacimiento: '2010-10-08', fechaCreacion: '2026-07-14', notas: '' },
  { id: 'c_imp_574', nombre: 'Jorge Yauri', telefono: '0995048795', email: '', nacimiento: '2006-04-11', fechaCreacion: '2026-05-06', notas: '' },
  { id: 'c_imp_575', nombre: 'Jose Andrade', telefono: '0990000000', email: '', nacimiento: '2000-04-11', fechaCreacion: '2026-04-05', notas: '' },
  { id: 'c_imp_576', nombre: 'Jose Auki', telefono: '0979777971', email: '', nacimiento: '2001-02-10', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_577', nombre: 'Jose Bermeo', telefono: '0991687448', email: '', nacimiento: '1998-11-17', fechaCreacion: '2026-02-27', notas: '' },
  { id: 'c_imp_578', nombre: 'Jose Carpio', telefono: '0990000000', email: '', nacimiento: '2009-05-03', fechaCreacion: '2026-05-03', notas: '' },
  { id: 'c_imp_579', nombre: 'Jose Casanova', telefono: '0990000000', email: '', nacimiento: '2013-06-19', fechaCreacion: '2026-04-10', notas: '' },
  { id: 'c_imp_580', nombre: 'Jose Chimboeazo', telefono: '0990000000', email: '', nacimiento: '1987-05-02', fechaCreacion: '2026-10-04', notas: '' },
  { id: 'c_imp_581', nombre: 'Jose Cornejo', telefono: '0958761564', email: '', nacimiento: '2009-02-22', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_582', nombre: 'Jose Guaman', telefono: '0992582569', email: '', nacimiento: '2013-07-15', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_583', nombre: 'Jose Lema', telefono: '0990000000', email: '', nacimiento: '2007-07-20', fechaCreacion: '2026-05-15', notas: '' },
  { id: 'c_imp_584', nombre: 'Jose Lema', telefono: '0999032117', email: '', nacimiento: '1998-09-23', fechaCreacion: '2026-05-17', notas: '' },
  { id: 'c_imp_585', nombre: 'Jose Lizardo', telefono: '098869548', email: '', nacimiento: '1996-08-15', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_586', nombre: 'Jose Lliguicota', telefono: '0979343370', email: '', nacimiento: '1999-11-30', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_587', nombre: 'Jose Luis Paucar', telefono: '0990000000', email: '', nacimiento: '2006-07-19', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_588', nombre: 'Jose Montenegro', telefono: '0990000000', email: '', nacimiento: '2009-06-10', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_589', nombre: 'Jose Pomaquiza', telefono: '0963015694', email: '', nacimiento: '2000-01-19', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_590', nombre: 'Jose Romero', telefono: '0983254596', email: '', nacimiento: '2009-03-25', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_591', nombre: 'Jose Romero', telefono: '0995948817', email: '', nacimiento: '2004-12-19', fechaCreacion: '2026-04-29', notas: '' },
  { id: 'c_imp_592', nombre: 'Jose Tobias', telefono: '0992687925', email: '', nacimiento: '2007-11-25', fechaCreacion: '2026-07-12', notas: '' },
  { id: 'c_imp_593', nombre: 'Jose Yumbla', telefono: '0990000000', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-07-08', notas: '' },
  { id: 'c_imp_594', nombre: 'Jose Zaruma', telefono: '0990000000', email: '', nacimiento: '1984-12-15', fechaCreacion: '2026-05-31', notas: '' },
  { id: 'c_imp_595', nombre: 'Jose Zhao', telefono: '0984884843', email: '', nacimiento: '2011-08-07', fechaCreacion: '2026-06-10', notas: '' },
  { id: 'c_imp_596', nombre: 'Josefat Carrera', telefono: '0992714863', email: '', nacimiento: '2012-10-24', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_597', nombre: 'Joseph Tapia', telefono: '0990000000', email: '', nacimiento: '2010-09-21', fechaCreacion: '2026-04-08', notas: '' },
  { id: 'c_imp_598', nombre: 'Jostin Alulema', telefono: '0983352084', email: '', nacimiento: '2011-11-16', fechaCreacion: '2026-08-31', notas: '' },
  { id: 'c_imp_599', nombre: 'Jostin Alvarez', telefono: '0998826573', email: '', nacimiento: '2011-02-10', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_600', nombre: 'Jostin Andrade', telefono: '09', email: '', nacimiento: '2011-03-29', fechaCreacion: '2026-04-18', notas: '' },
  { id: 'c_imp_601', nombre: 'Jostin Calle', telefono: '0992825604', email: '', nacimiento: '2010-01-16', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_602', nombre: 'Jostin Lala', telefono: '0998109336', email: '', nacimiento: '2009-09-15', fechaCreacion: '2026-05-10', notas: '' },
  { id: 'c_imp_603', nombre: 'Jostin Lazo', telefono: '0990000000', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_604', nombre: 'Jostin Palag', telefono: '0985633800', email: '', nacimiento: '2012-11-15', fechaCreacion: '2026-05-17', notas: '' },
  { id: 'c_imp_605', nombre: 'Jostin Sañay', telefono: '0990000000', email: '', nacimiento: '2009-03-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_606', nombre: 'Jostin Shinin', telefono: '0990000000', email: '', nacimiento: '2012-05-05', fechaCreacion: '2026-05-05', notas: '' },
  { id: 'c_imp_607', nombre: 'Jostin Tamay', telefono: '0992488572', email: '', nacimiento: '2009-04-11', fechaCreacion: '2026-06-09', notas: '' },
  { id: 'c_imp_608', nombre: 'Jostyn Astudillo', telefono: '0990000000', email: '', nacimiento: '2000-11-08', fechaCreacion: '2026-03-21', notas: '' },
  { id: 'c_imp_609', nombre: 'Jostyncriollo', telefono: '0987220242', email: '', nacimiento: '2011-12-09', fechaCreacion: '2026-04-01', notas: '' },
  { id: 'c_imp_610', nombre: 'Josue Aguayza', telefono: '0983187705', email: '', nacimiento: '2004-04-28', fechaCreacion: '2026-04-05', notas: '' },
  { id: 'c_imp_611', nombre: 'Josue Andrade', telefono: '0983262493', email: '', nacimiento: '2007-01-04', fechaCreacion: '2026-07-05', notas: '' },
  { id: 'c_imp_612', nombre: 'Josue Cusco', telefono: '0990000000', email: '', nacimiento: '2010-01-13', fechaCreacion: '2026-05-24', notas: '' },
  { id: 'c_imp_613', nombre: 'Luis Chimborazo', telefono: '0999100340', email: '', nacimiento: '2002-12-15', fechaCreacion: '2026-07-26', notas: '' },
  { id: 'c_imp_614', nombre: 'Josue Escobar', telefono: '0995878166', email: '', nacimiento: '1999-11-19', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_615', nombre: 'Josue Landy', telefono: '0984800201', email: '', nacimiento: '2009-09-13', fechaCreacion: '2026-05-12', notas: '' },
  { id: 'c_imp_616', nombre: 'Josue Maldonado', telefono: '0990000000', email: '', nacimiento: '2012-10-13', fechaCreacion: '2026-05-22', notas: '' },
  { id: 'c_imp_617', nombre: 'Josue Molina', telefono: '0984164773', email: '', nacimiento: '2005-09-11', fechaCreacion: '2026-07-18', notas: '' },
  { id: 'c_imp_618', nombre: 'Josue Muños', telefono: '0990000000', email: '', nacimiento: '2011-08-02', fechaCreacion: '2026-04-02', notas: '' },
  { id: 'c_imp_619', nombre: 'Josue Velasquez', telefono: '0995257583', email: '', nacimiento: '2011-11-28', fechaCreacion: '2026-07-09', notas: '' },
  { id: 'c_imp_620', nombre: 'Juakin Salasar', telefono: '0960629976', email: '', nacimiento: '2019-01-21', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_621', nombre: 'Juan Andrade', telefono: '0984660748', email: '', nacimiento: '2000-02-11', fechaCreacion: '2026-07-19', notas: '' },
  { id: 'c_imp_622', nombre: 'Juan Bermejo', telefono: '0987801020', email: '', nacimiento: '2005-01-25', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_623', nombre: 'Juan Carchi', telefono: '0990000000', email: '', nacimiento: '2000-01-14', fechaCreacion: '2026-08-05', notas: '' },
  { id: 'c_imp_624', nombre: 'Juan Castro', telefono: '0984291560', email: '', nacimiento: '2011-10-21', fechaCreacion: '2026-06-28', notas: '' },
  { id: 'c_imp_625', nombre: 'Juan Cazho', telefono: '0987758295', email: '', nacimiento: '2007-12-27', fechaCreacion: '2026-03-28', notas: '' },
  { id: 'c_imp_626', nombre: 'Juan Chaca', telefono: '0998649847', email: '', nacimiento: '2009-03-16', fechaCreacion: '2026-06-09', notas: '' },
  { id: 'c_imp_627', nombre: 'Juan Diego Bravo', telefono: '0963341807', email: '', nacimiento: '2012-05-01', fechaCreacion: '2026-07-19', notas: '' },
  { id: 'c_imp_628', nombre: 'Juan Guaman', telefono: '0990000000', email: '', nacimiento: '2009-08-28', fechaCreacion: '2026-03-08', notas: '' },
  { id: 'c_imp_629', nombre: 'Juan Guaman', telefono: '0990000000', email: '', nacimiento: '1992-09-16', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_630', nombre: 'Juan Lala', telefono: '0990000000', email: '', nacimiento: '2006-12-10', fechaCreacion: '2026-06-04', notas: '' },
  { id: 'c_imp_631', nombre: 'Juan Lema', telefono: '0982971456', email: '', nacimiento: '2004-02-10', fechaCreacion: '2026-04-27', notas: '' },
  { id: 'c_imp_632', nombre: 'Juan Lopez', telefono: '09884792818', email: '', nacimiento: '1984-01-23', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_633', nombre: 'Juan Montalvo', telefono: '0983173879', email: '', nacimiento: '2006-12-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_634', nombre: 'Juan Pacheco', telefono: '0990000000', email: '', nacimiento: '1998-09-29', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_635', nombre: 'Juan Palchisaca', telefono: '0984992915', email: '', nacimiento: '2009-09-05', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_636', nombre: 'Juan Paredes', telefono: '0997478947', email: '', nacimiento: '2012-04-29', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_637', nombre: 'Juan Peralta', telefono: '0990000000', email: '', nacimiento: '2011-09-04', fechaCreacion: '2026-06-05', notas: '' },
  { id: 'c_imp_638', nombre: 'Juan Remache', telefono: '0990000000', email: '', nacimiento: '2014-02-09', fechaCreacion: '2026-07-19', notas: '' },
  { id: 'c_imp_639', nombre: 'Juan Villacis', telefono: '0995318657', email: '', nacimiento: '2011-10-13', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_640', nombre: 'Juan Zhiguizaca', telefono: '0987525689', email: '', nacimiento: '1999-08-09', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_641', nombre: 'Julian Flores', telefono: '0995674169', email: '', nacimiento: '2007-10-23', fechaCreacion: '2026-07-16', notas: '' },
  { id: 'c_imp_642', nombre: 'Junior Romero', telefono: '0998649956', email: '', nacimiento: '2009-08-21', fechaCreacion: '2026-05-26', notas: '' },
  { id: 'c_imp_643', nombre: 'Junior Zara', telefono: '0990000000', email: '', nacimiento: '2009-10-28', fechaCreacion: '2026-03-04', notas: '' },
  { id: 'c_imp_644', nombre: 'Jusus Ochoa', telefono: '0987687504', email: '', nacimiento: '2007-07-10', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_645', nombre: 'Kelvin Espinoza', telefono: '0984768968', email: '', nacimiento: '2011-01-16', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_646', nombre: 'Kenay Pomavilla', telefono: '0995828680', email: '', nacimiento: '2009-03-23', fechaCreacion: '2026-05-08', notas: '' },
  { id: 'c_imp_647', nombre: 'Kevin Allaico', telefono: '0984644616', email: '', nacimiento: '2011-06-21', fechaCreacion: '2026-03-24', notas: '' },
  { id: 'c_imp_648', nombre: 'Kevin Archero', telefono: '0990000000', email: '', nacimiento: '2015-04-29', fechaCreacion: '2026-03-08', notas: '' },
  { id: 'c_imp_649', nombre: 'Kevin Arizaga', telefono: '0990000000', email: '', nacimiento: '2008-11-10', fechaCreacion: '2026-04-17', notas: '' },
  { id: 'c_imp_650', nombre: 'Kevin Bermeo', telefono: '0962592689', email: '', nacimiento: '2006-03-03', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_651', nombre: 'Kevin Caguana', telefono: '0990000000', email: '', nacimiento: '2008-10-30', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_652', nombre: 'Kevin Campoverde', telefono: '0987232274', email: '', nacimiento: '2005-01-08', fechaCreacion: '2026-06-08', notas: '' },
  { id: 'c_imp_653', nombre: 'Kevin Castillo', telefono: '0995791586', email: '', nacimiento: '2004-12-13', fechaCreacion: '2026-07-17', notas: '' },
  { id: 'c_imp_654', nombre: 'Kevin Castro', telefono: '0990281420', email: '', nacimiento: '2007-10-30', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_655', nombre: 'Kevin Chucho', telefono: '0987561950', email: '', nacimiento: '2003-06-04', fechaCreacion: '2026-09-25', notas: '' },
  { id: 'c_imp_656', nombre: 'Kevin Cruz', telefono: '0998937230', email: '', nacimiento: '2008-07-05', fechaCreacion: '2026-07-05', notas: '' },
  { id: 'c_imp_657', nombre: 'Kevin Cuenca', telefono: '0990000000', email: '', nacimiento: '2006-06-23', fechaCreacion: '2026-03-20', notas: '' },
  { id: 'c_imp_658', nombre: 'Kevin Cunin', telefono: '0999762733', email: '', nacimiento: '2009-01-16', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_659', nombre: 'Kevin Huerta', telefono: '0983314712', email: '', nacimiento: '2009-01-05', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_660', nombre: 'Kevin Kiror', telefono: '0984411711', email: '', nacimiento: '2008-09-07', fechaCreacion: '2026-03-29', notas: '' },
  { id: 'c_imp_661', nombre: 'Kevin Lema', telefono: '0994607274', email: '', nacimiento: '2008-09-30', fechaCreacion: '2026-07-19', notas: '' },
  { id: 'c_imp_662', nombre: 'Kevin Mayancela', telefono: '0995783960', email: '', nacimiento: '2009-03-09', fechaCreacion: '2026-07-19', notas: '' },
  { id: 'c_imp_663', nombre: 'Kevin Mendez', telefono: '0984720791', email: '', nacimiento: '2004-03-22', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_664', nombre: 'Kevin Montero', telefono: '0979318263', email: '', nacimiento: '2006-03-28', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_665', nombre: 'Kevin Mullo', telefono: '0962683155', email: '', nacimiento: '2003-11-17', fechaCreacion: '2026-04-27', notas: '' },
  { id: 'c_imp_666', nombre: 'Kevin Palchisaca', telefono: '0994671518', email: '', nacimiento: '2016-12-11', fechaCreacion: '2026-09-06', notas: '' },
  { id: 'c_imp_667', nombre: 'Kevin Qhishpil', telefono: '0990000000', email: '', nacimiento: '2012-02-20', fechaCreacion: '2026-06-14', notas: '' },
  { id: 'c_imp_668', nombre: 'Kevin Quindi', telefono: '0995638537', email: '', nacimiento: '2009-12-18', fechaCreacion: '2026-05-20', notas: '' },
  { id: 'c_imp_669', nombre: 'Kevin Vega', telefono: '0995849617', email: '', nacimiento: '2010-05-10', fechaCreacion: '2026-07-19', notas: '' },
  { id: 'c_imp_670', nombre: 'Kevin Velazques', telefono: '0990000000', email: '', nacimiento: '2012-06-19', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_671', nombre: 'Kimi Ochoa', telefono: '0998788733', email: '', nacimiento: '2005-07-25', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_672', nombre: 'Klevder Rodrigez', telefono: '0990000000', email: '', nacimiento: '2010-09-19', fechaCreacion: '2026-03-18', notas: '' },
  { id: 'c_imp_673', nombre: 'Kusy Pinguil', telefono: '0990000000', email: '', nacimiento: '2009-06-16', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_674', nombre: 'Lady Llanos', telefono: '0999898086', email: '', nacimiento: '2008-09-30', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_675', nombre: 'Len Mateus', telefono: '0979194994', email: '', nacimiento: '2004-03-03', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_676', nombre: 'Lenin Cazho', telefono: '0995021626', email: '', nacimiento: '2004-04-27', fechaCreacion: '2026-03-28', notas: '' },
  { id: 'c_imp_677', nombre: 'Lenin Murudumbay', telefono: '0983549449', email: '', nacimiento: '2006-04-18', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_678', nombre: 'Lenin Quizhpi', telefono: '09999969681', email: '', nacimiento: '2008-11-23', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_679', nombre: 'Leo Caizan', telefono: '0995555219', email: '', nacimiento: '2012-03-26', fechaCreacion: '2026-04-19', notas: '' },
  { id: 'c_imp_680', nombre: 'Leonardo Macancela', telefono: '0990000000', email: '', nacimiento: '1995-10-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_681', nombre: 'Leonel Castañeda', telefono: '0998874387', email: '', nacimiento: '2012-11-27', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_682', nombre: 'Leonel Chimborazo', telefono: '0993675672', email: '', nacimiento: '2010-09-04', fechaCreacion: '2026-06-30', notas: '' },
  { id: 'c_imp_683', nombre: 'Leonel Guaman', telefono: '0995265043', email: '', nacimiento: '2008-07-21', fechaCreacion: '2026-04-28', notas: '' },
  { id: 'c_imp_684', nombre: 'Leonel Liquinchano', telefono: '0987593962', email: '', nacimiento: '2011-05-24', fechaCreacion: '2026-05-21', notas: '' },
  { id: 'c_imp_685', nombre: 'Leonidas Tamay', telefono: '0995439773', email: '', nacimiento: '2008-03-31', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_686', nombre: 'Liam Amaguaña', telefono: '0979373545', email: '', nacimiento: '2012-09-19', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_687', nombre: 'Liam Romero', telefono: '0998558704', email: '', nacimiento: '2007-02-10', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_688', nombre: 'Lian Bermeo', telefono: '0992721381', email: '', nacimiento: '2022-07-15', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_689', nombre: 'Lian Villalta', telefono: '0990000000', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_690', nombre: 'Lliguichusca Jacob', telefono: '0958862044', email: '', nacimiento: '2008-07-01', fechaCreacion: '2026-07-08', notas: '' },
  { id: 'c_imp_691', nombre: 'Llimi Simbaina', telefono: '0990000000', email: '', nacimiento: '2008-06-23', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_692', nombre: 'Lorenso Avila', telefono: '0990000000', email: '', nacimiento: '2015-11-12', fechaCreacion: '2026-03-15', notas: '' },
  { id: 'c_imp_693', nombre: 'Luciano Montalvo', telefono: '0998532802', email: '', nacimiento: '2009-03-17', fechaCreacion: '2026-06-13', notas: '' },
  { id: 'c_imp_694', nombre: 'Luis Alban', telefono: '0958615738', email: '', nacimiento: '2011-01-13', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_695', nombre: 'Luis Angamarca', telefono: '0983468759', email: '', nacimiento: '2011-03-29', fechaCreacion: '2026-05-14', notas: '' },
  { id: 'c_imp_696', nombre: 'Luis Angamarca', telefono: '0998062747', email: '', nacimiento: '2010-12-29', fechaCreacion: '2026-03-12', notas: '' },
  { id: 'c_imp_697', nombre: 'Luis Barros', telefono: '096714452', email: '', nacimiento: '2005-04-05', fechaCreacion: '2026-05-15', notas: '' },
  { id: 'c_imp_698', nombre: 'Luis Caco', telefono: '0989271633', email: '', nacimiento: '2006-01-05', fechaCreacion: '2026-06-21', notas: '' },
  { id: 'c_imp_699', nombre: 'Luis Caguana', telefono: '0990000000', email: '', nacimiento: '2002-01-04', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_700', nombre: 'Luis Calle', telefono: '0992942573', email: '', nacimiento: '2004-10-23', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_701', nombre: 'Luis Castro', telefono: '0990000000', email: '', nacimiento: '2012-02-27', fechaCreacion: '2026-08-23', notas: '' },
  { id: 'c_imp_702', nombre: 'Luis Castro', telefono: '0990000000', email: '', nacimiento: '2009-09-23', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_703', nombre: 'Luis Chimborazo', telefono: '0998131565', email: '', nacimiento: '2010-10-10', fechaCreacion: '2026-03-29', notas: '' },
  { id: 'c_imp_704', nombre: 'Luis Cordova', telefono: '0995391044', email: '', nacimiento: '2009-07-21', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_705', nombre: 'Luis Cuni', telefono: '091933032', email: '', nacimiento: '2003-09-26', fechaCreacion: '2026-03-25', notas: '' },
  { id: 'c_imp_706', nombre: 'Luis Fares', telefono: '0990000000', email: '', nacimiento: '2009-07-05', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_707', nombre: 'Luis Gallardo', telefono: '0986356658', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_708', nombre: 'Luis Guaman', telefono: '0984295474', email: '', nacimiento: '2010-07-05', fechaCreacion: '2026-04-10', notas: '' },
  { id: 'c_imp_709', nombre: 'Luis Guaman', telefono: '0968659560', email: '', nacimiento: '2003-09-22', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_710', nombre: 'Luis Guaraca', telefono: '0967549180', email: '', nacimiento: '2004-08-20', fechaCreacion: '2026-07-16', notas: '' },
  { id: 'c_imp_711', nombre: 'Luis Jimenes', telefono: '0992992077', email: '', nacimiento: '2009-12-28', fechaCreacion: '2026-05-17', notas: '' },
  { id: 'c_imp_712', nombre: 'Luis Lala', telefono: '0979855985', email: '', nacimiento: '1992-02-07', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_713', nombre: 'Luis Lala', telefono: '0939407450', email: '', nacimiento: '1999-09-26', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_714', nombre: 'Luis Leonardo', telefono: '0983534693', email: '', nacimiento: '2012-01-27', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_715', nombre: 'Luis Loja', telefono: '0990000000', email: '', nacimiento: '1992-09-30', fechaCreacion: '2026-03-15', notas: '' },
  { id: 'c_imp_716', nombre: 'Luis Mainato', telefono: '0998732021', email: '', nacimiento: '2013-04-01', fechaCreacion: '2026-03-22', notas: '' },
  { id: 'c_imp_717', nombre: 'Luis Mayancela', telefono: '0999755240', email: '', nacimiento: '2010-12-18', fechaCreacion: '2026-05-10', notas: '' },
  { id: 'c_imp_718', nombre: 'Luis Montero', telefono: '0990000000', email: '', nacimiento: '2012-07-20', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_719', nombre: 'Luis Morocho', telefono: '0992610445', email: '', nacimiento: '2008-04-02', fechaCreacion: '2026-05-10', notas: '' },
  { id: 'c_imp_720', nombre: 'Luis Pauta', telefono: '0939502359', email: '', nacimiento: '1998-08-24', fechaCreacion: '2026-05-08', notas: '' },
  { id: 'c_imp_721', nombre: 'Luis Pinguil', telefono: '0992577325', email: '', nacimiento: '2005-03-30', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_722', nombre: 'Luis Pomaquiza', telefono: '0990000000', email: '', nacimiento: '2010-11-21', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_723', nombre: 'Luis Pomavilla', telefono: '0962585422', email: '', nacimiento: '1999-02-14', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_724', nombre: 'Luis Rodrigues', telefono: '0961176478', email: '', nacimiento: '1982-10-27', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_725', nombre: 'Luis Saula', telefono: '0990000000', email: '', nacimiento: '1990-08-12', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_726', nombre: 'Luis Tacuri', telefono: '0998282419', email: '', nacimiento: '2008-09-27', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_727', nombre: 'Maicol Quito', telefono: '0990000000', email: '', nacimiento: '2008-01-24', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_728', nombre: 'Manolo Alava', telefono: '0999876459', email: '', nacimiento: '2009-04-04', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_729', nombre: 'Manuel Allaico', telefono: '0994610672', email: '', nacimiento: '2008-11-05', fechaCreacion: '2026-04-12', notas: '' },
  { id: 'c_imp_730', nombre: 'Manuel Chuqui', telefono: '0999541363', email: '', nacimiento: '1998-04-13', fechaCreacion: '2026-07-15', notas: '' },
  { id: 'c_imp_731', nombre: 'Manuel Guaman', telefono: '0999214626', email: '', nacimiento: '2010-11-13', fechaCreacion: '2026-07-08', notas: '' },
  { id: 'c_imp_732', nombre: 'Manuel Guaman', telefono: '0979062617', email: '', nacimiento: '2010-03-08', fechaCreacion: '2026-07-15', notas: '' },
  { id: 'c_imp_733', nombre: 'Manuel Lliguicota', telefono: '0990000000', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-04-19', notas: '' },
  { id: 'c_imp_734', nombre: 'Manuel Lliguicota', telefono: '0990000000', email: '', nacimiento: '1981-11-15', fechaCreacion: '2026-05-10', notas: '' },
  { id: 'c_imp_735', nombre: 'Manuel Mayancela', telefono: '0985933670', email: '', nacimiento: '1973-09-18', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_736', nombre: 'Manuel Puli', telefono: '0999709594', email: '', nacimiento: '2006-01-20', fechaCreacion: '2026-09-30', notas: '' },
  { id: 'c_imp_737', nombre: 'Manuel Vega', telefono: '0987893400', email: '', nacimiento: '2005-12-22', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_738', nombre: 'Marcelo Narvaez', telefono: '0999742438', email: '', nacimiento: '2007-04-25', fechaCreacion: '2026-07-04', notas: '' },
  { id: 'c_imp_739', nombre: 'Marcelo Rodriguez', telefono: '0959957870', email: '', nacimiento: '2006-09-02', fechaCreacion: '2026-07-24', notas: '' },
  { id: 'c_imp_740', nombre: 'Marco Alulema', telefono: '0958955559', email: '', nacimiento: '1996-08-10', fechaCreacion: '2026-09-24', notas: '' },
  { id: 'c_imp_741', nombre: 'Marco Lala', telefono: '0968569987', email: '', nacimiento: '2001-12-22', fechaCreacion: '2026-04-12', notas: '' },
  { id: 'c_imp_742', nombre: 'Marco Lala', telefono: '0986251969', email: '', nacimiento: '2005-06-29', fechaCreacion: '2026-05-17', notas: '' },
  { id: 'c_imp_743', nombre: 'Marco Ochoa', telefono: '0984395672', email: '', nacimiento: '2011-06-13', fechaCreacion: '2026-05-19', notas: '' },
  { id: 'c_imp_744', nombre: 'Marco Ordoñes', telefono: '0998337477', email: '', nacimiento: '2013-07-11', fechaCreacion: '2026-03-17', notas: '' },
  { id: 'c_imp_745', nombre: 'Marco Ordoñez', telefono: '0969071374', email: '', nacimiento: '2002-09-11', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_746', nombre: 'Marcos Muzha', telefono: '0998717508', email: '', nacimiento: '2009-03-07', fechaCreacion: '2026-04-05', notas: '' },
  { id: 'c_imp_747', nombre: 'Mario Arizaga', telefono: '0990000000', email: '', nacimiento: '2013-05-04', fechaCreacion: '2026-05-10', notas: '' },
  { id: 'c_imp_748', nombre: 'Mario Calle', telefono: '0992973697', email: '', nacimiento: '2005-03-23', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_749', nombre: 'Mario Chuqui', telefono: '0962805623', email: '', nacimiento: '1991-02-20', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_750', nombre: 'Mario Orbe', telefono: '0992680058', email: '', nacimiento: '1970-10-07', fechaCreacion: '2026-07-14', notas: '' },
  { id: 'c_imp_751', nombre: 'Marlon Bustamante', telefono: '0987176315', email: '', nacimiento: '1993-02-19', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_752', nombre: 'Martin Cordova', telefono: '0987610635', email: '', nacimiento: '2011-08-24', fechaCreacion: '2026-07-08', notas: '' },
  { id: 'c_imp_753', nombre: 'Mateo Bermeo', telefono: '0993056822', email: '', nacimiento: '2005-02-26', fechaCreacion: '2026-02-27', notas: '' },
  { id: 'c_imp_754', nombre: 'Mateo Chimborazo', telefono: '0990000000', email: '', nacimiento: '2013-10-28', fechaCreacion: '2026-03-08', notas: '' },
  { id: 'c_imp_755', nombre: 'Mateo Espinoza', telefono: '0998500447', email: '', nacimiento: '2012-07-27', fechaCreacion: '2026-02-26', notas: '' },
  { id: 'c_imp_756', nombre: 'Mateo Lojan', telefono: '0995132647', email: '', nacimiento: '2013-07-13', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_757', nombre: 'Mateo Morocho', telefono: '0992731726', email: '', nacimiento: '2011-06-24', fechaCreacion: '2026-05-21', notas: '' },
  { id: 'c_imp_758', nombre: 'Matias Yanez', telefono: '0984717571', email: '', nacimiento: '2012-10-10', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_759', nombre: 'Matias Angamarca', telefono: '0984125231', email: '', nacimiento: '2014-10-25', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_760', nombre: 'Matias Guaraca', telefono: '0983159136', email: '', nacimiento: '2010-11-09', fechaCreacion: '2026-04-01', notas: '' },
  { id: 'c_imp_761', nombre: 'Matias Llugsa', telefono: '0968658760', email: '', nacimiento: '2010-05-15', fechaCreacion: '2026-05-07', notas: '' },
  { id: 'c_imp_762', nombre: 'Matias Paguay', telefono: '0995776903', email: '', nacimiento: '2004-05-29', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_763', nombre: 'Matias Santa Cruz', telefono: '0991845320', email: '', nacimiento: '2010-12-09', fechaCreacion: '2026-09-12', notas: '' },
  { id: 'c_imp_764', nombre: 'Matias Tenelema', telefono: '0992703993', email: '', nacimiento: '2011-12-02', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_765', nombre: 'Matias Zambrano', telefono: '0992821235', email: '', nacimiento: '2010-11-20', fechaCreacion: '2026-06-12', notas: '' },
  { id: 'c_imp_766', nombre: 'Matio Naranjo', telefono: '0992684626', email: '', nacimiento: '2009-03-18', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_767', nombre: 'Matiu Lema', telefono: '0990000000', email: '', nacimiento: '2015-11-06', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_768', nombre: 'Mauricio Guaman', telefono: '0984626153', email: '', nacimiento: '2006-05-19', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_769', nombre: 'Mauricio Lazo', telefono: '0989834245', email: '', nacimiento: '2007-06-03', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_770', nombre: 'Mauricio Ochoa', telefono: '0988406959', email: '', nacimiento: '2003-12-29', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_771', nombre: 'Mauricio Tenecota', telefono: '0990000000', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-07-19', notas: '' },
  { id: 'c_imp_772', nombre: 'Mauricio Torres', telefono: '09984604721', email: '', nacimiento: '2012-07-14', fechaCreacion: '2026-04-15', notas: '' },
  { id: 'c_imp_773', nombre: 'Mauricio Yanez', telefono: '0979028820', email: '', nacimiento: '2009-07-21', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_774', nombre: 'Mauro Lala', telefono: '0990000000', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_775', nombre: 'Max Loja', telefono: '0987809729', email: '', nacimiento: '2007-12-01', fechaCreacion: '2026-03-15', notas: '' },
  { id: 'c_imp_776', nombre: 'Maximo Sinche', telefono: '0984887781', email: '', nacimiento: '2006-11-09', fechaCreacion: '2026-05-04', notas: '' },
  { id: 'c_imp_777', nombre: 'Maycol Ruiz', telefono: '0995875333', email: '', nacimiento: '2009-07-27', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_778', nombre: 'Maykel Mayancela', telefono: '0995703712', email: '', nacimiento: '2012-07-17', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_779', nombre: 'Mayquel Alulema', telefono: '0990000000', email: '', nacimiento: '2014-05-15', fechaCreacion: '2026-06-01', notas: '' },
  { id: 'c_imp_780', nombre: 'Mesias Caguana', telefono: '0980358623', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-05-10', notas: '' },
  { id: 'c_imp_781', nombre: 'Michael Astudillo', telefono: '0987235883', email: '', nacimiento: '2009-09-13', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_782', nombre: 'Michael Quito', telefono: '0993814899', email: '', nacimiento: '2012-01-24', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_783', nombre: 'Miguel Angel', telefono: '0990000000', email: '', nacimiento: '2004-08-24', fechaCreacion: '2026-03-04', notas: '' },
  { id: 'c_imp_784', nombre: 'Miguel Tacuri', telefono: '0987615079', email: '', nacimiento: '1989-04-10', fechaCreacion: '2026-05-11', notas: '' },
  { id: 'c_imp_785', nombre: 'Milton Chucho', telefono: '0983179425', email: '', nacimiento: '1994-12-03', fechaCreacion: '2026-03-21', notas: '' },
  { id: 'c_imp_786', nombre: 'Milton Narvaez', telefono: '0980103843', email: '', nacimiento: '1983-04-21', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_787', nombre: 'Nemias Barona', telefono: '0992888883', email: '', nacimiento: '2007-11-20', fechaCreacion: '2026-03-28', notas: '' },
  { id: 'c_imp_788', nombre: 'Noe Lala', telefono: '0990000000', email: '', nacimiento: '2022-12-13', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_789', nombre: 'Ñaymuy Pomavilla', telefono: '0990000000', email: '', nacimiento: '2012-10-22', fechaCreacion: '2026-05-08', notas: '' },
  { id: 'c_imp_790', nombre: 'O', telefono: '0990000000', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_791', nombre: 'Oliver Alulema', telefono: '0990000000', email: '', nacimiento: '2007-02-09', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_792', nombre: 'Omar Calle', telefono: '0984970520', email: '', nacimiento: '2007-09-24', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_793', nombre: 'Omar Loja', telefono: '099958028', email: '', nacimiento: '2012-02-07', fechaCreacion: '2026-03-17', notas: '' },
  { id: 'c_imp_794', nombre: 'Oscar Castro', telefono: '0990000000', email: '', nacimiento: '2011-06-30', fechaCreacion: '2026-03-15', notas: '' },
  { id: 'c_imp_795', nombre: 'Oscar Jaran', telefono: '0992672484', email: '', nacimiento: '1999-10-02', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_796', nombre: 'Oscar Medina', telefono: '0993257226', email: '', nacimiento: '2007-09-07', fechaCreacion: '2026-05-29', notas: '' },
  { id: 'c_imp_797', nombre: 'Oscar Mendieta', telefono: '0983747280', email: '', nacimiento: '2009-12-17', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_798', nombre: 'Pablo Burgos', telefono: '0990000000', email: '', nacimiento: '2007-08-01', fechaCreacion: '2026-03-01', notas: '' },
  { id: 'c_imp_799', nombre: 'Pablo Crespo', telefono: '0983494208', email: '', nacimiento: '2010-10-01', fechaCreacion: '2026-06-02', notas: '' },
  { id: 'c_imp_800', nombre: 'Pablo Gonzales', telefono: '0998508863', email: '', nacimiento: '1983-03-14', fechaCreacion: '2026-05-26', notas: '' },
  { id: 'c_imp_801', nombre: 'Pablo Gonzales', telefono: '0990000000', email: '', nacimiento: '2020-12-07', fechaCreacion: '2026-05-26', notas: '' },
  { id: 'c_imp_802', nombre: 'Pablo Simbaña', telefono: '0999582631', email: '', nacimiento: '1990-08-17', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_803', nombre: 'Patricio Bermeo', telefono: '0990000000', email: '', nacimiento: '1993-04-23', fechaCreacion: '2026-06-14', notas: '' },
  { id: 'c_imp_804', nombre: 'Patricio Cepeda', telefono: '0998167186', email: '', nacimiento: '1979-07-24', fechaCreacion: '2026-05-09', notas: '' },
  { id: 'c_imp_805', nombre: 'Patricio Lema', telefono: '0987107523', email: '', nacimiento: '1994-10-04', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_806', nombre: 'Patricio Paucar', telefono: '0990000000', email: '', nacimiento: '2011-05-22', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_807', nombre: 'Paul Farez', telefono: '0990000000', email: '', nacimiento: '1993-05-17', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_808', nombre: 'Paul Mayancela', telefono: '0987022653', email: '', nacimiento: '2005-01-22', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_809', nombre: 'Paul Morocho', telefono: '0988370841', email: '', nacimiento: '2003-08-10', fechaCreacion: '2026-10-02', notas: '' },
  { id: 'c_imp_810', nombre: 'Paul Salango', telefono: '0999936550', email: '', nacimiento: '2010-10-14', fechaCreacion: '2026-07-16', notas: '' },
  { id: 'c_imp_811', nombre: 'Paul Sangolqui', telefono: '0995929733', email: '', nacimiento: '2006-11-28', fechaCreacion: '2026-05-22', notas: '' },
  { id: 'c_imp_812', nombre: 'Paul Torres', telefono: '0967259646', email: '', nacimiento: '2009-10-22', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_813', nombre: 'Pedro Acero', telefono: '0984055903', email: '', nacimiento: '2009-03-18', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_814', nombre: 'Pedro Alvarez', telefono: '0990000000', email: '', nacimiento: '1998-05-28', fechaCreacion: '2026-03-23', notas: '' },
  { id: 'c_imp_815', nombre: 'Pedro Cela', telefono: '0990000000', email: '', nacimiento: '1998-11-01', fechaCreacion: '2026-03-07', notas: '' },
  { id: 'c_imp_816', nombre: 'Pedro Serpa', telefono: '0962596382', email: '', nacimiento: '2011-11-07', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_817', nombre: 'Pedro Tenelema', telefono: '0959696585', email: '', nacimiento: '2002-06-11', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_818', nombre: 'Peter Pichisaca', telefono: '0983209727', email: '', nacimiento: '2005-05-05', fechaCreacion: '2026-03-16', notas: '' },
  { id: 'c_imp_819', nombre: 'Piter Pichasaca', telefono: '0998456194', email: '', nacimiento: '1980-06-22', fechaCreacion: '2026-09-25', notas: '' },
  { id: 'c_imp_820', nombre: 'Piter Pichasaca', telefono: '0990000000', email: '', nacimiento: '2005-05-05', fechaCreacion: '2026-05-23', notas: '' },
  { id: 'c_imp_821', nombre: 'Rafael Chimbo', telefono: '0992986870', email: '', nacimiento: '2007-04-14', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_822', nombre: 'Randy Quito', telefono: '0987996494', email: '', nacimiento: '2011-09-18', fechaCreacion: '2026-03-25', notas: '' },
  { id: 'c_imp_823', nombre: 'Raul Ordoñez', telefono: '0995455402', email: '', nacimiento: '2002-04-23', fechaCreacion: '2026-07-18', notas: '' },
  { id: 'c_imp_824', nombre: 'Reik Padilla', telefono: '0990000000', email: '', nacimiento: '2009-03-21', fechaCreacion: '2026-09-24', notas: '' },
  { id: 'c_imp_825', nombre: 'Reinaldo Cordoba', telefono: '0984365945', email: '', nacimiento: '1996-06-17', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_826', nombre: 'Ricardo Avila', telefono: '0983893465', email: '', nacimiento: '2003-10-20', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_827', nombre: 'Ricardo Macancela', telefono: '0990000000', email: '', nacimiento: '1997-09-02', fechaCreacion: '2026-03-30', notas: '' },
  { id: 'c_imp_828', nombre: 'Ricardo Zambrano', telefono: '0987258914', email: '', nacimiento: '2009-08-09', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_829', nombre: 'Richard Herera', telefono: '0988276306', email: '', nacimiento: '2007-08-29', fechaCreacion: '2026-04-06', notas: '' },
  { id: 'c_imp_830', nombre: 'Rigoberto Lala', telefono: '0990331553', email: '', nacimiento: '2011-09-10', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_831', nombre: 'Robert Hernandez', telefono: '0998080232', email: '', nacimiento: '2010-01-17', fechaCreacion: '2026-05-01', notas: '' },
  { id: 'c_imp_832', nombre: 'Rodrigo Reinoso', telefono: '0995206763', email: '', nacimiento: '2010-09-10', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_833', nombre: 'Ronal Rivera', telefono: '0980373212', email: '', nacimiento: '2008-02-14', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_834', nombre: 'Roy Astudillo', telefono: '0990000000', email: '', nacimiento: '2024-03-20', fechaCreacion: '2026-03-21', notas: '' },
  { id: 'c_imp_835', nombre: 'Roy Mayancela', telefono: '0990000000', email: '', nacimiento: '2009-03-17', fechaCreacion: '2026-03-20', notas: '' },
  { id: 'c_imp_836', nombre: 'Ruben Delgado', telefono: '0990000000', email: '', nacimiento: '2013-03-22', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_837', nombre: 'Ruben Loja', telefono: '0998105349', email: '', nacimiento: '2006-04-17', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_838', nombre: 'Sairy Quizhpilema', telefono: '0986165095', email: '', nacimiento: '2010-12-27', fechaCreacion: '2026-04-19', notas: '' },
  { id: 'c_imp_839', nombre: 'Salazar Morales', telefono: '0959252799', email: '', nacimiento: '1998-10-20', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_840', nombre: 'Samael Ordoñes', telefono: '0990000000', email: '', nacimiento: '2003-02-06', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_841', nombre: 'Samuel Cambi', telefono: '0999987669', email: '', nacimiento: '2016-08-04', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_842', nombre: 'Samuel Guzman', telefono: '0998446091', email: '', nacimiento: '2012-04-09', fechaCreacion: '2026-07-19', notas: '' },
  { id: 'c_imp_843', nombre: 'Samuel Muñoz', telefono: '0979228535', email: '', nacimiento: '2009-07-09', fechaCreacion: '2026-06-02', notas: '' },
  { id: 'c_imp_844', nombre: 'Samuel Rosas', telefono: '0990000000', email: '', nacimiento: '2022-02-07', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_845', nombre: 'Santiago Arce', telefono: '0990765815', email: '', nacimiento: '2003-07-07', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_846', nombre: 'Santiago Calle', telefono: '0987183672', email: '', nacimiento: '2009-10-20', fechaCreacion: '2026-09-25', notas: '' },
  { id: 'c_imp_847', nombre: 'Santiago Calle', telefono: '0990000000', email: '', nacimiento: '2010-04-20', fechaCreacion: '2026-03-13', notas: '' },
  { id: 'c_imp_848', nombre: 'Santiago Correa', telefono: '0999862214', email: '', nacimiento: '2010-04-30', fechaCreacion: '2026-04-02', notas: '' },
  { id: 'c_imp_849', nombre: 'Santiago Espinoza', telefono: '0962684394', email: '', nacimiento: '2010-09-12', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_850', nombre: 'Santiago Matute', telefono: '0960573680', email: '', nacimiento: '2000-12-17', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_851', nombre: 'Santiago Molina', telefono: '0978932051', email: '', nacimiento: '2001-08-28', fechaCreacion: '2026-05-01', notas: '' },
  { id: 'c_imp_852', nombre: 'Santiago Neira', telefono: '0983745638', email: '', nacimiento: '2010-10-13', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_853', nombre: 'Santiago Parra', telefono: '0998211067', email: '', nacimiento: '2005-05-21', fechaCreacion: '2026-02-24', notas: '' },
  { id: 'c_imp_854', nombre: 'Santiago Vasques', telefono: '0998996438', email: '', nacimiento: '2012-04-23', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_855', nombre: 'Saul Ojeda', telefono: '0992767271', email: '', nacimiento: '2012-12-25', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_856', nombre: 'Saymir Morocho', telefono: '0984762458', email: '', nacimiento: '2010-06-01', fechaCreacion: '2026-09-12', notas: '' },
  { id: 'c_imp_857', nombre: 'Sebastian Caguana', telefono: '0990000000', email: '', nacimiento: '2012-03-11', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_858', nombre: 'Sebastian Defaz', telefono: '0983290637', email: '', nacimiento: '2000-06-07', fechaCreacion: '2026-07-01', notas: '' },
  { id: 'c_imp_859', nombre: 'Sebastian Garcia', telefono: '0990000000', email: '', nacimiento: '2008-04-02', fechaCreacion: '2026-07-05', notas: '' },
  { id: 'c_imp_860', nombre: 'Sebastian Humala', telefono: '0998518369', email: '', nacimiento: '2009-07-11', fechaCreacion: '2026-09-24', notas: '' },
  { id: 'c_imp_861', nombre: 'Sebastian Martinez', telefono: '0979134291', email: '', nacimiento: '2003-10-20', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_862', nombre: 'Sebastian Mesa', telefono: '0987206348', email: '', nacimiento: '2005-05-20', fechaCreacion: '2026-06-21', notas: '' },
  { id: 'c_imp_863', nombre: 'Sebastian Rodriguez', telefono: '0998583045', email: '', nacimiento: '2009-01-04', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_864', nombre: 'Sebastian Siguencia', telefono: '0972302979', email: '', nacimiento: '2010-03-28', fechaCreacion: '2026-08-31', notas: '' },
  { id: 'c_imp_865', nombre: 'Sebastian Siguencia', telefono: '0990000000', email: '', nacimiento: '2010-10-24', fechaCreacion: '2026-03-27', notas: '' },
  { id: 'c_imp_866', nombre: 'Sebastian Valvoa', telefono: '0978907003', email: '', nacimiento: '1999-06-12', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_867', nombre: 'Sebastian Zaruma', telefono: '0979293571', email: '', nacimiento: '2018-02-17', fechaCreacion: '2026-09-06', notas: '' },
  { id: 'c_imp_868', nombre: 'Segundo Guaman', telefono: '0989230870', email: '', nacimiento: '2006-05-02', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_869', nombre: 'Segundo Guaman', telefono: '0969570999', email: '', nacimiento: '1999-07-20', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_870', nombre: 'Segundo Lazo', telefono: '0990000000', email: '', nacimiento: '2005-08-01', fechaCreacion: '2026-04-02', notas: '' },
  { id: 'c_imp_871', nombre: 'Sergio Duchi', telefono: '0982416690', email: '', nacimiento: '2004-01-20', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_872', nombre: 'Shermy Yupa', telefono: '0990000000', email: '', nacimiento: '2020-08-12', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_873', nombre: 'Shyami Moreno', telefono: '0990000000', email: '', nacimiento: '2012-08-28', fechaCreacion: '2026-05-17', notas: '' },
  { id: 'c_imp_874', nombre: 'Simon Acero', telefono: '0998464099', email: '', nacimiento: '1989-09-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_875', nombre: 'Simon Mayancela', telefono: '0998265871', email: '', nacimiento: '2009-10-10', fechaCreacion: '2026-05-10', notas: '' },
  { id: 'c_imp_876', nombre: 'Stalin Montero', telefono: '0984325335', email: '', nacimiento: '2008-04-13', fechaCreacion: '2026-07-05', notas: '' },
  { id: 'c_imp_877', nombre: 'Stalin Pichazaca', telefono: '0990000000', email: '', nacimiento: '2011-12-04', fechaCreacion: '2026-07-12', notas: '' },
  { id: 'c_imp_878', nombre: 'Stalyn Huera', telefono: '0984387634', email: '', nacimiento: '2010-03-19', fechaCreacion: '2026-05-10', notas: '' },
  { id: 'c_imp_879', nombre: 'Stephen Muñoz', telefono: '0969045084', email: '', nacimiento: '2012-08-22', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_880', nombre: 'Steven Andrade', telefono: '0999987600', email: '', nacimiento: '2010-05-04', fechaCreacion: '2026-09-25', notas: '' },
  { id: 'c_imp_881', nombre: 'Steven Fajardo', telefono: '0985734956', email: '', nacimiento: '2002-04-14', fechaCreacion: '2026-10-04', notas: '' },
  { id: 'c_imp_882', nombre: 'Steven Huera', telefono: '0984846166', email: '', nacimiento: '2011-04-06', fechaCreacion: '2026-04-26', notas: '' },
  { id: 'c_imp_883', nombre: 'Sury Alulema', telefono: '0990000000', email: '', nacimiento: '2005-06-02', fechaCreacion: '2026-03-11', notas: '' },
  { id: 'c_imp_884', nombre: 'Sury Morocho', telefono: '0990000000', email: '', nacimiento: '2012-06-14', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_885', nombre: 'Tupak Solano', telefono: '0987588171', email: '', nacimiento: '2007-05-21', fechaCreacion: '2026-05-19', notas: '' },
  { id: 'c_imp_886', nombre: 'Ulices Tamay', telefono: '0994730259', email: '', nacimiento: '2011-01-11', fechaCreacion: '2026-09-24', notas: '' },
  { id: 'c_imp_887', nombre: 'Vairon 0Jeda', telefono: '0992595371', email: '', nacimiento: '2009-11-07', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_888', nombre: 'Valentin Cusco', telefono: '0969006109', email: '', nacimiento: '2003-02-14', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_889', nombre: 'Vicente Pichasaca', telefono: '0990000000', email: '', nacimiento: '2013-09-07', fechaCreacion: '2026-05-18', notas: '' },
  { id: 'c_imp_890', nombre: 'Victor Cela', telefono: '098962991', email: '', nacimiento: '2006-11-01', fechaCreacion: '2026-04-10', notas: '' },
  { id: 'c_imp_891', nombre: 'Victor Chicayza', telefono: '0958620990', email: '', nacimiento: '1996-12-05', fechaCreacion: '2026-03-10', notas: '' },
  { id: 'c_imp_892', nombre: 'Victor Lema', telefono: '097963845', email: '', nacimiento: '2012-11-12', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_893', nombre: 'Vinicio Espinoza', telefono: '0987764300', email: '', nacimiento: '2009-05-18', fechaCreacion: '2026-03-22', notas: '' },
  { id: 'c_imp_894', nombre: 'Vinicio Morocho', telefono: '0962594805', email: '', nacimiento: '2006-03-30', fechaCreacion: '2026-09-12', notas: '' },
  { id: 'c_imp_895', nombre: 'Walter Cazho', telefono: '0983709070', email: '', nacimiento: '1990-12-24', fechaCreacion: '2026-05-30', notas: '' },
  { id: 'c_imp_896', nombre: 'Washingtonhuerta', telefono: '0990000000', email: '', nacimiento: '2006-11-30', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_897', nombre: 'Wilian Garate', telefono: '0984029713', email: '', nacimiento: '2002-12-30', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_898', nombre: 'Wilian Huerta', telefono: '0990000000', email: '', nacimiento: '2007-02-15', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_899', nombre: 'Wilian Jachero', telefono: '0995367029', email: '', nacimiento: '2000-08-02', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_900', nombre: 'Wilian Ojeda', telefono: '0979241471', email: '', nacimiento: '2005-10-13', fechaCreacion: '2026-05-24', notas: '' },
  { id: 'c_imp_901', nombre: 'William Montero', telefono: '0990000000', email: '', nacimiento: '2006-08-10', fechaCreacion: '2026-05-03', notas: '' },
  { id: 'c_imp_902', nombre: 'Wilmer Alvacora', telefono: '0989339212', email: '', nacimiento: '2004-10-26', fechaCreacion: '2026-05-19', notas: '' },
  { id: 'c_imp_903', nombre: 'Wilmer Camas', telefono: '0984062816', email: '', nacimiento: '2009-03-11', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_904', nombre: 'Wilmer Guaman', telefono: '0990000000', email: '', nacimiento: '2007-03-06', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_905', nombre: 'Wilmer Lala', telefono: '0988332898', email: '', nacimiento: '1999-12-28', fechaCreacion: '2026-05-03', notas: '' },
  { id: 'c_imp_906', nombre: 'Wilmer Ortiz', telefono: '0990000000', email: '', nacimiento: '2010-11-23', fechaCreacion: '2026-06-13', notas: '' },
  { id: 'c_imp_907', nombre: 'Wilmer Pichisaca', telefono: '0990000000', email: '', nacimiento: '2011-08-18', fechaCreacion: '2026-05-25', notas: '' },
  { id: 'c_imp_908', nombre: 'Wilmer Silva', telefono: '0961841927', email: '', nacimiento: '1996-07-04', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_909', nombre: 'Wilmer Villanueva', telefono: '0995548374', email: '', nacimiento: '1989-10-19', fechaCreacion: '2026-03-26', notas: '' },
  { id: 'c_imp_910', nombre: 'Wilson Andrade', telefono: '0959996518', email: '', nacimiento: '2008-10-06', fechaCreacion: '2026-08-23', notas: '' },
  { id: 'c_imp_911', nombre: 'Wilson Cazho', telefono: '0983882085', email: '', nacimiento: '2008-06-05', fechaCreacion: '2026-05-08', notas: '' },
  { id: 'c_imp_912', nombre: 'Wilson Espinoza', telefono: '0990000000', email: '', nacimiento: '2010-11-27', fechaCreacion: '2026-03-06', notas: '' },
  { id: 'c_imp_913', nombre: 'Wilson Fajaro', telefono: '0998061252', email: '', nacimiento: '1987-06-12', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_914', nombre: 'Wilson Loja', telefono: '0990000000', email: '', nacimiento: '2008-04-29', fechaCreacion: '2026-03-10', notas: '' },
  { id: 'c_imp_915', nombre: 'Wilson Saeteros', telefono: '0962959518', email: '', nacimiento: '2001-01-06', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_916', nombre: 'Wualter Chanalata', telefono: '099756329', email: '', nacimiento: '2022-05-06', fechaCreacion: '2026-04-24', notas: '' },
  { id: 'c_imp_917', nombre: 'Xavier Tapia', telefono: '0995423260', email: '', nacimiento: '1995-03-12', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_918', nombre: 'Yeiser Escalante', telefono: '0986253689', email: '', nacimiento: '2009-04-24', fechaCreacion: '2026-07-26', notas: '' },
  { id: 'c_imp_919', nombre: 'Zaid Sanango', telefono: '099297403', email: '', nacimiento: '2019-06-30', fechaCreacion: '2026-05-09', notas: '' },
  { id: 'c_imp_920', nombre: 'Mateo Romeo', telefono: '0990000000', email: '', nacimiento: '2010-11-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_921', nombre: 'Juan Alvarado', telefono: '0990000000', email: '', nacimiento: '1987-08-13', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_922', nombre: 'Luis Guaman', telefono: '0990000000', email: '', nacimiento: '1997-12-13', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_923', nombre: 'Klever Casas', telefono: '0990000000', email: '', nacimiento: '2002-10-13', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_924', nombre: 'Jose Tenelema', telefono: '0990000000', email: '', nacimiento: '2006-03-07', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_925', nombre: 'Jonnathan Mayancela', telefono: '0990000000', email: '', nacimiento: '2009-09-16', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_926', nombre: 'Grabiel Narvaesz', telefono: '0990000000', email: '', nacimiento: '2005-03-19', fechaCreacion: '2026-06-14', notas: '' },
  { id: 'c_imp_927', nombre: 'Carlos Alulema', telefono: '0990000000', email: '', nacimiento: '1988-08-20', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_928', nombre: 'Willian Villavicencio', telefono: '0990000000', email: '', nacimiento: '2010-09-09', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_929', nombre: 'Moises Villavicencio', telefono: '0990000000', email: '', nacimiento: '2017-07-29', fechaCreacion: '2026-08-07', notas: '' },
  { id: 'c_imp_930', nombre: 'Luis Quindi', telefono: '0990000000', email: '', nacimiento: '1999-12-20', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_931', nombre: 'Santiago Morocho', telefono: '0990000000', email: '', nacimiento: '2012-12-08', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_932', nombre: 'Fher Romero', telefono: '0990000000', email: '', nacimiento: '2015-05-14', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_933', nombre: 'Jose Cuzco', telefono: '0990000000', email: '', nacimiento: '2000-06-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_934', nombre: 'Jair Narvaez', telefono: '0990000000', email: '', nacimiento: '2013-10-29', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_935', nombre: 'Hernan Caña', telefono: '0990000000', email: '', nacimiento: '2011-01-12', fechaCreacion: '2026-07-26', notas: '' },
  { id: 'c_imp_936', nombre: 'Brayan Quizhpi', telefono: '0990000000', email: '', nacimiento: '1998-10-20', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_937', nombre: 'Michael Barbecho', telefono: '0990000000', email: '', nacimiento: '2009-03-18', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_938', nombre: 'Jordys Guacho', telefono: '0990000000', email: '', nacimiento: '1999-11-03', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_939', nombre: 'Edgar Isquierdo', telefono: '0983034063', email: '', nacimiento: '2011-02-24', fechaCreacion: '2026-08-31', notas: '' },
  { id: 'c_imp_940', nombre: 'Eitan Carabajo', telefono: '0987737569', email: '', nacimiento: '2018-05-30', fechaCreacion: '2026-09-02', notas: '' },
  { id: 'c_imp_941', nombre: 'Romel Berdugo', telefono: '0984623220', email: '', nacimiento: '2005-12-08', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_942', nombre: 'Brayan Pichasaca', telefono: '0996096105', email: '', nacimiento: '1996-09-16', fechaCreacion: '2026-09-10', notas: '' },
  { id: 'c_imp_943', nombre: 'Jhair Arcentales', telefono: '0990000000', email: '', nacimiento: '2011-02-19', fechaCreacion: '2026-07-24', notas: '' },
  { id: 'c_imp_944', nombre: 'Edgar Morocho', telefono: '0984611298', email: '', nacimiento: '1986-11-16', fechaCreacion: '2026-06-14', notas: '' },
  { id: 'c_imp_945', nombre: 'Alexis Mainato', telefono: '0990000000', email: '', nacimiento: '2002-11-24', fechaCreacion: '2026-04-30', notas: '' },
  { id: 'c_imp_946', nombre: 'Luis Morocho', telefono: '0983954822', email: '', nacimiento: '2008-04-02', fechaCreacion: '2026-04-25', notas: '' },
  { id: 'c_imp_947', nombre: 'Aniston Bargas', telefono: '0969457770', email: '', nacimiento: '2006-01-28', fechaCreacion: '2026-05-06', notas: '' },
  { id: 'c_imp_948', nombre: 'Jose Tenesaca', telefono: '0990000000', email: '', nacimiento: '2009-05-08', fechaCreacion: '2026-02-22', notas: '' },
  { id: 'c_imp_949', nombre: 'Sebas Siguencia', telefono: '0995165695', email: '', nacimiento: '2007-08-21', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_950', nombre: 'Carlos Riera', telefono: '0990000000', email: '', nacimiento: '2008-03-26', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_951', nombre: 'Angel Mayancela', telefono: '0991522329', email: '', nacimiento: '2002-08-20', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_952', nombre: 'David Quito', telefono: '0989844292', email: '', nacimiento: '2009-01-07', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_953', nombre: 'Stiven Chimborazo', telefono: '0999716869', email: '', nacimiento: '2009-06-08', fechaCreacion: '2026-04-06', notas: '' },
  { id: 'c_imp_954', nombre: 'Juan Angulo', telefono: '0999716861', email: '', nacimiento: '2011-07-11', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_955', nombre: 'Josue Maldonado', telefono: '0990000000', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_956', nombre: 'Elkin Pillaga', telefono: '0984746093', email: '', nacimiento: '2011-08-30', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_957', nombre: 'Kevin Cuenca', telefono: '0939394225', email: '', nacimiento: '2007-04-27', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_958', nombre: 'Cristian Yunga', telefono: '0990000000', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_959', nombre: 'Matias Masapanta', telefono: '0992810811', email: '', nacimiento: '2008-10-06', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_960', nombre: 'Juan Carlos', telefono: '0990000000', email: '', nacimiento: '2006-12-10', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_961', nombre: 'Manuel Espinoza', telefono: '0995084153', email: '', nacimiento: '2006-05-18', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_962', nombre: 'Manuel Guaman', telefono: '0990000000', email: '', nacimiento: '1996-05-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_963', nombre: 'Wilson Andrade', telefono: '0990000000', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_964', nombre: 'Jairo Morocho', telefono: '0987675650', email: '', nacimiento: '2008-03-17', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_965', nombre: 'Ricardo Sanango', telefono: '0979228175', email: '', nacimiento: '1998-12-24', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_966', nombre: 'Jose Andrade', telefono: '0990000000', email: '', nacimiento: '2008-04-08', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_967', nombre: 'Bryan Jimenez', telefono: '0990000000', email: '', nacimiento: '2009-02-17', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_968', nombre: 'David Bermejo', telefono: '0987766628', email: '', nacimiento: '2008-11-30', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_969', nombre: 'Franklin Zaruma', telefono: '0998023553', email: '', nacimiento: '2007-08-09', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_970', nombre: 'Brayan Tacuri', telefono: '0990000000', email: '', nacimiento: '2012-10-13', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_971', nombre: 'Leandro Lazo', telefono: '09285733205', email: '', nacimiento: '2008-05-12', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_972', nombre: 'Bayron Solorzano', telefono: '0987119449', email: '', nacimiento: '2007-08-15', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_973', nombre: 'Klever Rodriguez', telefono: '0968684372', email: '', nacimiento: '2010-10-19', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_974', nombre: 'Mauro Lala', telefono: '0990000000', email: '', nacimiento: '2000-05-12', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_975', nombre: 'Jhonny Enrique', telefono: '0989253606', email: '', nacimiento: '2005-09-21', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_976', nombre: 'Alexis Lopez', telefono: '0992741997', email: '', nacimiento: '2010-11-23', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_977', nombre: 'Juan Lala', telefono: '0999087522', email: '', nacimiento: '2009-11-10', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_978', nombre: 'David Camas', telefono: '0990000000', email: '', nacimiento: '2007-06-11', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_979', nombre: 'Adrian Huerta', telefono: '0990000000', email: '', nacimiento: '2008-01-27', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_980', nombre: 'Peter Pichazaca', telefono: '0990000000', email: '', nacimiento: '2005-05-05', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_981', nombre: 'Brian Mayancela', telefono: '0990000000', email: '', nacimiento: '2011-01-23', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_982', nombre: 'Walter Quiroz', telefono: '0990000000', email: '', nacimiento: '2003-04-10', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_983', nombre: 'Josua Velasquez', telefono: '0990000000', email: '', nacimiento: '2002-11-28', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_984', nombre: 'Manolo Avila', telefono: '0990000000', email: '', nacimiento: '2002-04-04', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_985', nombre: 'Wilson', telefono: '0990000000', email: '', nacimiento: '2002-03-08', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_986', nombre: 'Fabricio Torres', telefono: '0979864231', email: '', nacimiento: '2008-01-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_987', nombre: 'Juan Simbaina', telefono: '0990000000', email: '', nacimiento: '1996-02-10', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_988', nombre: 'Cristian Pichazaca', telefono: '0990000000', email: '', nacimiento: '2009-01-15', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_989', nombre: 'Nestor', telefono: '0990000000', email: '', nacimiento: '2005-09-10', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_990', nombre: 'Jose Yauri', telefono: '0990000000', email: '', nacimiento: '2006-04-11', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_991', nombre: 'Luis Pomavilla', telefono: '0968655190', email: '', nacimiento: '1999-02-14', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_992', nombre: 'Vinicos Lema', telefono: '0992614240', email: '', nacimiento: '2006-10-18', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_993', nombre: 'Carlosmontero', telefono: '0959547910', email: '', nacimiento: '2005-05-09', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_994', nombre: 'Jesus Narvaes', telefono: '0998342354', email: '', nacimiento: '2008-03-22', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_995', nombre: 'Alexis Quito', telefono: '0990000000', email: '', nacimiento: '2000-01-01', fechaCreacion: '2026-01-01', notas: '' },
  { id: 'c_imp_996', nombre: 'Luis Tapay', telefono: '0995585575', email: '', nacimiento: '2003-04-15', fechaCreacion: '2026-01-01', notas: '' }
  ],
  ventas: []
};

// Autenticación de Super Admin
const PASSWORD_SUPER_ADMIN = "admin123";
let esSuperAdmin = false;

function cargarDatos() {
  const local = localStorage.getItem('styleStudioMultiBranch');
  const data = local ? JSON.parse(local) : DEFAULT_DATA;
  
  if (data.productos) {
    data.productos.forEach(p => {
      if (!p.fechaCreacion) p.fechaCreacion = new Date().toISOString().split('T')[0];
    });
  }
  if (data.servicios) {
    data.servicios.forEach(s => {
      if (!s.fechaCreacion) s.fechaCreacion = new Date().toISOString().split('T')[0];
      if (s.usosCount === undefined) s.usosCount = 0;
    });
  }

  return data;
}

function guardarDatos() {
  localStorage.setItem('styleStudioMultiBranch', JSON.stringify(appData));
}

let appData = cargarDatos();
let carritoPOS = [];
let moduloActual = 'dashboard';

document.addEventListener('DOMContentLoaded', () => {
  setupNavegacion();
  setupTema();
  renderizarSucursales();
  actualizarVisibilidadBotonesAdmin();
  renderizarModulo('dashboard');
});

function setupNavegacion() {
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;

      if (targetTab === 'superadmin' && !esSuperAdmin) {
        document.getElementById('superAdminPassInput').value = '';
        abrirModal('modalSuperAdminAuth');
        return;
      }

      activarPestana(btn, targetTab);
    });
  });

  document.getElementById('mobileMenuBtn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });
}

function activarPestana(btn, targetTab) {
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  moduloActual = targetTab;
  renderizarModulo(moduloActual);
  document.getElementById('sidebar').classList.remove('open');
}

function validarPasswordSuperAdmin(e) {
  e.preventDefault();
  const inputPass = document.getElementById('superAdminPassInput').value;

  if (inputPass === PASSWORD_SUPER_ADMIN) {
    esSuperAdmin = true;
    cerrarModal('modalSuperAdminAuth');
    actualizarVisibilidadBotonesAdmin();
    
    const superAdminBtn = document.querySelector('.nav-btn[data-tab="superadmin"]');
    activarPestana(superAdminBtn, 'superadmin');
  } else {
    alert('Contraseña incorrecta. Inténtalo de nuevo.');
  }
}

function cerrarSesionSuperAdmin() {
  if (confirm('¿Deseas cerrar la sesión de Super Admin? Se ocultarán las funciones avanzadas.')) {
    esSuperAdmin = false;
    actualizarVisibilidadBotonesAdmin();
    const dashboardBtn = document.querySelector('.nav-btn[data-tab="dashboard"]');
    activarPestana(dashboardBtn, 'dashboard');
    alert('Sesión de Super Admin cerrada correctamente.');
  }
}

function actualizarVisibilidadBotonesAdmin() {
  const adminElements = document.querySelectorAll('.admin-only');
  adminElements.forEach(el => {
    if (esSuperAdmin) {
      el.classList.add('unlocked');
    } else {
      el.classList.remove('unlocked');
    }
  });

  const badge = document.getElementById('badgeAdminActive');
  const btnCerrarHeader = document.getElementById('btnCerrarSuperAdmin');
  const icon = document.getElementById('adminStatusIcon');
  
  if (esSuperAdmin) {
    if (badge) badge.style.display = 'inline-flex';
    if (btnCerrarHeader) btnCerrarHeader.style.display = 'inline-flex';
    if (icon) {
      icon.className = 'fa-solid fa-lock-open';
      icon.style.color = 'var(--emerald)';
    }
  } else {
    if (badge) badge.style.display = 'none';
    if (btnCerrarHeader) btnCerrarHeader.style.display = 'none';
    if (icon) {
      icon.className = 'fa-solid fa-lock';
      icon.style.color = '';
    }
  }
}

// Gestión de Sucursales
function renderizarSucursales() {
  const select = document.getElementById('sucursalSelect');
  select.innerHTML = appData.sucursales.map(s => `
    <option value="${s.id}" ${s.id === appData.sucursalActiva ? 'selected' : ''}>${s.nombre}</option>
  `).join('');
}

function cambiarSucursal(id) {
  appData.sucursalActiva = id;
  guardarDatos();
  renderizarModulo(moduloActual);
}

function guardarSucursal(e) {
  e.preventDefault();
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');

  const nueva = {
    id: 'suc_' + Date.now(),
    nombre: document.getElementById('sucursalNombre').value,
    direccion: document.getElementById('sucursalDireccion').value
  };

  appData.sucursales.push(nueva);
  appData.sucursalActiva = nueva.id;
  guardarDatos();
  cerrarModal('modalSucursal');
  renderizarSucursales();
  renderizarModulo(moduloActual);
}

function eliminarSucursalActiva() {
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');

  if (appData.sucursales.length <= 1) {
    alert('No puedes eliminar la última sucursal existente.');
    return;
  }

  const sucursalActual = appData.sucursales.find(s => s.id === appData.sucursalActiva);
  const nombreSucursal = sucursalActual ? sucursalActual.nombre : 'esta sucursal';

  if (confirm(`¿Estás seguro de que deseas eliminar la sucursal "${nombreSucursal}"? Se eliminarán también sus estilistas, productos y registros asociados a esta ubicación.`)) {
    const idEliminar = appData.sucursalActiva;

    appData.sucursales = appData.sucursales.filter(s => s.id !== idEliminar);
    appData.estilistas = appData.estilistas.filter(e => e.sucursalId !== idEliminar);
    appData.productos = appData.productos.filter(p => p.sucursalId !== idEliminar);
    appData.ventas = appData.ventas.filter(v => v.sucursalId !== idEliminar);

    appData.sucursalActiva = appData.sucursales[0].id;

    guardarDatos();
    renderizarSucursales();
    renderizarModulo(moduloActual);
  }
}

function renderizarModulo(modulo) {
  document.querySelectorAll('.module').forEach(m => m.classList.remove('active'));
  const activeMod = document.getElementById(`mod-${modulo}`);
  if (activeMod) activeMod.classList.add('active');

  const sucursal = appData.sucursales.find(s => s.id === appData.sucursalActiva);
  const nombreSuc = sucursal ? sucursal.nombre : 'General';

  const titulos = {
    dashboard: [`Dashboard - ${nombreSuc}`, 'Resumen diario y estadísticas de esta sucursal'],
    pos: [`Punto de Venta - ${nombreSuc}`, 'Facturación y cobranza'],
    estilistas: [`Estilistas - ${nombreSuc}`, 'Personal asignado a esta sucursal'],
    inventario: [`Inventario & Servicios - ${nombreSuc}`, 'Gestión de stock de productos y catálogo de servicios'],
    clientes: ['Clientes Globales', 'Directorio de clientes de la cadena'],
    superadmin: ['Panel Super Admin', 'Control global, gestión de sucursales y reportes avanzados']
  };

  if (titulos[modulo]) {
    document.getElementById('pageTitle').innerText = titulos[modulo][0];
    document.getElementById('pageSubTitle').innerText = titulos[modulo][1];
  }

  poblarSelects();

  if (modulo === 'dashboard') renderizarDashboard();
  if (modulo === 'pos') renderizarPOS();
  if (modulo === 'estilistas') renderizarEstilistas();
  if (modulo === 'inventario') {
    renderizarInventario();
    comprobarAvisoCompraInventario();
  }
  if (modulo === 'clientes') renderizarClientes();
  if (modulo === 'superadmin') renderizarSuperAdmin();
}

// DASHBOARD
function renderizarDashboard() {
  const hoy = new Date().toISOString().split('T')[0];
  const ventasSucursal = appData.ventas.filter(v => v.sucursalId === appData.sucursalActiva);
  const ingresosHoy = ventasSucursal
    .filter(v => v.fecha === hoy)
    .reduce((sum, v) => sum + v.total, 0);
  const estilistasCount = appData.estilistas.filter(e => e.sucursalId === appData.sucursalActiva).length;
  const stockBajo = appData.productos.filter(p => p.sucursalId === appData.sucursalActiva && p.stock <= 5).length;

  document.getElementById('dashIngresos').innerText = `$${ingresosHoy.toFixed(2)}`;
  document.getElementById('dashEstilistas').innerText = estilistasCount;
  document.getElementById('dashStockBajo').innerText = stockBajo;

  const tbodyVentas = document.getElementById('dashTablaVentas');
  tbodyVentas.innerHTML = ventasSucursal.length === 0
    ? `<tr><td colspan="6" class="text-center">Sin facturas recientes registradas</td></tr>`
    : ventasSucursal.slice(-15).reverse().map(v => {
        const cliente = appData.clientes.find(c => c.id === v.clienteId)?.nombre || 'Cliente Ocasional';
        const estilista = appData.estilistas.find(e => e.id === v.estilistaId)?.nombre || 'Sin Asignar';
        return `
          <tr>
            <td>${v.fecha}</td>
            <td><strong>${cliente}</strong></td>
            <td>${estilista}</td>
            <td><span class="badge-status badge-Confirmada">${v.metodoPago}</span></td>
            <td><strong>$${v.total.toFixed(2)}</strong></td>
            <td>
              <button class="btn btn-primary btn-sm" onclick="reimprimirTicket('${v.id}')" title="Reimprimir Factura">
                <i class="fa-solid fa-print"></i> Imprimir
              </button>
            </td>
          </tr>
        `;
      }).join('');
}

// SUPER ADMIN
function cambiarSubmodSuperAdmin(tab, btn) {
  document.querySelectorAll('#mod-superadmin .tab-link').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  if (tab === 'global') {
    document.getElementById('submod-superadmin-global').style.display = 'block';
    document.getElementById('submod-superadmin-reportes').style.display = 'none';
  } else {
    document.getElementById('submod-superadmin-global').style.display = 'none';
    document.getElementById('submod-superadmin-reportes').style.display = 'block';
    actualizarGraficosSuperAdmin();
  }
}

function renderizarSuperAdmin() {
  const container = document.getElementById('superAdminContainer');
  if (!container) return;

  // Renderizar vista de sucursales
  container.innerHTML = appData.sucursales.map(sucursal => {
    const ventasSuc = appData.ventas.filter(v => v.sucursalId === sucursal.id);
    const totalGanancias = ventasSuc.reduce((sum, v) => sum + v.total, 0);
    const estilistasSuc = appData.estilistas.filter(e => e.sucursalId === sucursal.id);
    const productosSuc = appData.productos.filter(p => p.sucursalId === sucursal.id);

    return `
      <div class="card" style="margin-bottom: 2rem; border-left: 4px solid var(--accent);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
          <div>
            <h2 style="font-size: 1.2rem; color: var(--text-primary);"><i class="fa-solid fa-store"></i> ${sucursal.nombre}</h2>
            <small style="color: var(--text-secondary);">${sucursal.direccion}</small>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 0.8rem; color: var(--text-secondary);">Ganancias Totales:</span>
            <h3 style="color: var(--emerald); font-size: 1.3rem;">$${totalGanancias.toFixed(2)}</h3>
          </div>
        </div>

        <div class="grid-2-col" style="gap: 1rem;">
          <div style="background: var(--bg-primary); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-color);">
            <h4 style="margin-bottom: 0.5rem; font-size: 0.95rem; color: var(--accent);"><i class="fa-solid fa-user-ninja"></i> Peluqueros / Estilistas (${estilistasSuc.length})</h4>
            ${estilistasSuc.length === 0 ? '<p style="font-size: 0.85rem; color: var(--text-secondary);">No hay estilistas registrados.</p>' : `
              <ul style="list-style: none; padding: 0;">
                ${estilistasSuc.map(e => `<li style="padding: 4px 0; border-bottom: 1px solid var(--border-color); font-size: 0.85rem; display: flex; justify-content: space-between;"><span>${e.nombre}</span> <small>Cédula: ${e.cedula || 'N/A'}</small></li>`).join('')}
              </ul>
            `}
          </div>

          <div style="background: var(--bg-primary); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-color);">
            <h4 style="margin-bottom: 0.5rem; font-size: 0.95rem; color: var(--amber);"><i class="fa-solid fa-boxes-stacked"></i> Inventario / Stock (${productosSuc.length})</h4>
            ${productosSuc.length === 0 ? '<p style="font-size: 0.85rem; color: var(--text-secondary);">No hay productos registrados.</p>' : `
              <ul style="list-style: none; padding: 0; max-height: 120px; overflow-y: auto;">
                ${productosSuc.map(p => `<li style="padding: 4px 0; border-bottom: 1px solid var(--border-color); font-size: 0.85rem; display: flex; justify-content: space-between;"><span>${p.nombre}</span> <strong>Stock: ${p.stock} ($${p.precio})</strong></li>`).join('')}
              </ul>
            `}
          </div>
        </div>

        <div style="background: var(--bg-primary); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-color); margin-top: 1rem;">
          <h4 style="margin-bottom: 0.5rem; font-size: 0.95rem; color: var(--blue);"><i class="fa-solid fa-scissors"></i> Servicios Disponibles</h4>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 0.5rem;">
            ${appData.servicios.map(s => `<span style="background: var(--bg-card); padding: 4px 10px; border-radius: 6px; font-size: 0.85rem; border: 1px solid var(--border-color);">${s.nombre} - <strong>$${s.precio.toFixed(2)}</strong></span>`).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Poblar selector de sucursales en reporte
  const selectReportes = document.getElementById('filtroReporteSucursal');
  if (selectReportes) {
    selectReportes.innerHTML = `<option value="todas">Todas las Sucursales (Consolidado)</option>` + 
      appData.sucursales.map(s => `<option value="${s.id}">${s.nombre}</option>`).join('');
  }
}

function limpiarFiltrosFechasReportes() {
  document.getElementById('reporteFechaInicio').value = '';
  document.getElementById('reporteFechaFin').value = '';
  actualizarGraficosSuperAdmin();
}

// ACTUALIZAR Y RENDERIZAR GRÁFICOS DENTRO DE SUPER ADMIN CON FILTROS DE FECHA
function actualizarGraficosSuperAdmin() {
  const selectFilter = document.getElementById('filtroReporteSucursal');
  const sucursalIdSeleccionada = selectFilter ? selectFilter.value : 'todas';
  
  const fechaInicio = document.getElementById('reporteFechaInicio').value;
  const fechaFin = document.getElementById('reporteFechaFin').value;

  const ctx1 = document.getElementById('chartServiciosPopulares').getContext('2d');
  const ctx2 = document.getElementById('chartEstilistasVentas').getContext('2d');
  const ctx3 = document.getElementById('chartIngresosSemanales').getContext('2d');

  if (window.repChart1) window.repChart1.destroy();
  if (window.repChart2) window.repChart2.destroy();
  if (window.repChart3) window.repChart3.destroy();

  // 1. Filtrar Ventas por Fecha y Sucursal
  let ventasFiltradas = appData.ventas;
  if (sucursalIdSeleccionada !== 'todas') {
    ventasFiltradas = ventasFiltradas.filter(v => v.sucursalId === sucursalIdSeleccionada);
  }
  if (fechaInicio) {
    ventasFiltradas = ventasFiltradas.filter(v => v.fecha >= fechaInicio);
  }
  if (fechaFin) {
    ventasFiltradas = ventasFiltradas.filter(v => v.fecha <= fechaFin);
  }

  // 2. Cálculo para Gráfico 1: Servicios más solicitados (Pie Chart)
  const contadorServicios = {};
  appData.servicios.forEach(s => contadorServicios[s.id] = 0);

  ventasFiltradas.forEach(v => {
    if (Array.isArray(v.items)) {
      v.items.forEach(item => {
        if (item.tipo === 'servicio') {
          contadorServicios[item.id] = (contadorServicios[item.id] || 0) + (item.cantidad || 1);
        }
      });
    }
  });

  const labelsServicios = appData.servicios.map(s => s.nombre);
  const dataServicios = appData.servicios.map(s => contadorServicios[s.id] || s.usosCount || 0);

  window.repChart1 = new Chart(ctx1, {
    type: 'pie',
    data: {
      labels: labelsServicios,
      datasets: [{
        data: dataServicios,
        backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6'],
        borderWidth: 2,
        borderColor: 'var(--bg-card)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: 'var(--text-primary)', font: { size: 11 } }
        }
      }
    }
  });

  // 3. Cálculo para Gráfico 2: Ventas por Estilista (Bar Chart)
  let estilistasFiltrados = appData.estilistas;
  if (sucursalIdSeleccionada !== 'todas') {
    estilistasFiltrados = appData.estilistas.filter(e => e.sucursalId === sucursalIdSeleccionada);
  }

  const gananciasEstilista = {};
  estilistasFiltrados.forEach(e => gananciasEstilista[e.id] = 0);

  ventasFiltradas.forEach(v => {
    if (gananciasEstilista[v.estilistaId] !== undefined) {
      gananciasEstilista[v.estilistaId] += (v.total || 0);
    }
  });

  window.repChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: estilistasFiltrados.map(e => e.nombre),
      datasets: [{
        label: 'Ventas Total ($)',
        data: estilistasFiltrados.map(e => gananciasEstilista[e.id] || 0),
        backgroundColor: '#3b82f6',
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { ticks: { color: 'var(--text-secondary)' }, grid: { display: false } },
        y: { ticks: { color: 'var(--text-secondary)' }, grid: { color: 'var(--border-color)' } }
      }
    }
  });

  // 4. Cálculo para Gráfico 3: Rendimiento de Ventas en el Tiempo (Line/Bar Chart)
  const ventasPorFechaMap = {};
  ventasFiltradas.forEach(v => {
    ventasPorFechaMap[v.fecha] = (ventasPorFechaMap[v.fecha] || 0) + v.total;
  });

  let fechasOrdenadas = Object.keys(ventasPorFechaMap).sort();
  if (fechasOrdenadas.length === 0) {
    fechasOrdenadas = ['Sin Datos'];
    ventasPorFechaMap['Sin Datos'] = 0;
  }

  window.repChart3 = new Chart(ctx3, {
    type: 'line',
    data: {
      labels: fechasOrdenadas,
      datasets: [{
        label: 'Rendimiento Ventas ($)',
        data: fechasOrdenadas.map(f => ventasPorFechaMap[f]),
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#10b981',
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: 'var(--text-primary)' } }
      },
      scales: {
        x: { ticks: { color: 'var(--text-secondary)' }, grid: { display: false } },
        y: { ticks: { color: 'var(--text-secondary)' }, grid: { color: 'var(--border-color)' } }
      }
    }
  });
}

// CAJA / POS
function renderizarPOS() {
  const grid = document.getElementById('posCatalogGrid');
  const prodsSucursal = appData.productos.filter(p => p.sucursalId === appData.sucursalActiva);
  const items = [...appData.servicios, ...prodsSucursal];

  grid.innerHTML = items.map(item => `
    <div class="pos-item-card" onclick="agregarAlCarrito('${item.id}')">
      <strong>${item.nombre}</strong>
      <p>$${item.precio.toFixed(2)}</p>
      <small>${item.tipo.toUpperCase()}</small>
    </div>
  `).join('');

  renderizarCarritoPOS();
}

function filtrarPOSCatalog(tipo, btn) {
  document.querySelectorAll('.pos-tabs .tab-link').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const grid = document.getElementById('posCatalogGrid');
  const prodsSucursal = appData.productos.filter(p => p.sucursalId === appData.sucursalActiva);
  let items = [...appData.servicios, ...prodsSucursal];

  if (tipo !== 'todos') items = items.filter(i => i.tipo === tipo);

  grid.innerHTML = items.map(item => `
    <div class="pos-item-card" onclick="agregarAlCarrito('${item.id}')">
      <strong>${item.nombre}</strong>
      <p>$${item.precio.toFixed(2)}</p>
      <small>${item.tipo.toUpperCase()}</small>
    </div>
  `).join('');
}

function agregarAlCarrito(itemId) {
  const prodsSucursal = appData.productos.filter(p => p.sucursalId === appData.sucursalActiva);
  const item = [...appData.servicios, ...prodsSucursal].find(i => i.id === itemId);
  if (!item) return;

  const existe = carritoPOS.find(i => i.id === itemId);
  if (existe) { existe.cantidad++; } 
  else { carritoPOS.push({ ...item, cantidad: 1 }); }

  renderizarCarritoPOS();
}

function renderizarCarritoPOS() {
  const container = document.getElementById('cartItemsList');
  if (carritoPOS.length === 0) {
    container.innerHTML = '<p class="empty-msg">No hay ítems agregados</p>';
    calcularTotalesPOS();
    return;
  }

  container.innerHTML = carritoPOS.map((item, index) => `
    <div class="cart-item">
      <div>
        <strong>${item.nombre}</strong><br>
        <small>$${item.precio.toFixed(2)} x ${item.cantidad}</small>
      </div>
      <div>
        <strong>$${(item.precio * item.cantidad).toFixed(2)}</strong>
        <button class="btn btn-danger" style="padding:2px 6px;" onclick="quitarDelCarrito(${index})">&times;</button>
      </div>
    </div>
  `).join('');

  calcularTotalesPOS();
}

function quitarDelCarrito(index) {
  carritoPOS.splice(index, 1);
  renderizarCarritoPOS();
}

function calcularTotalesPOS() {
  const total = carritoPOS.reduce((sum, i) => sum + (i.precio * i.cantidad), 0);
  document.getElementById('posTotal').innerText = `$${total.toFixed(2)}`;
  calcularVuelto();
}

function toggleSeccionEfectivo() {
  const metodo = document.getElementById('posMetodoPago').value;
  const seccion = document.getElementById('seccionEfectivo');
  if (metodo === 'Efectivo') {
    seccion.style.display = 'block';
  } else {
    seccion.style.display = 'none';
  }
}

function calcularVuelto() {
  const metodo = document.getElementById('posMetodoPago').value;
  if (metodo !== 'Efectivo') return;

  const total = carritoPOS.reduce((sum, i) => sum + (i.precio * i.cantidad), 0);
  const efectivoRecibido = parseFloat(document.getElementById('posEfectivoRecibido').value) || 0;
  const vuelto = efectivoRecibido - total;

  const lblVuelto = document.getElementById('posVuelto');
  if (vuelto >= 0) {
    lblVuelto.innerText = `$${vuelto.toFixed(2)}`;
    lblVuelto.style.color = 'var(--emerald)';
  } else {
    lblVuelto.innerText = `Faltan $${Math.abs(vuelto).toFixed(2)}`;
    lblVuelto.style.color = 'var(--danger)';
  }
}

function procesarPagoPOS() {
  if (carritoPOS.length === 0) return alert('El carrito está vacío');

  const total = carritoPOS.reduce((sum, i) => sum + (i.precio * i.cantidad), 0);
  const metodoPago = document.getElementById('posMetodoPago').value;

  let efectivoRecibido = 0;
  let vuelto = 0;

  if (metodoPago === 'Efectivo') {
    efectivoRecibido = parseFloat(document.getElementById('posEfectivoRecibido').value) || 0;
    if (efectivoRecibido < total) {
      alert('El efectivo recibido es menor al total a pagar.');
      return;
    }
    vuelto = efectivoRecibido - total;
  }

  const venta = {
    id: 'v_' + Date.now(),
    sucursalId: appData.sucursalActiva,
    fecha: new Date().toISOString().split('T')[0],
    clienteId: document.getElementById('posCliente').value || null,
    estilistaId: document.getElementById('posEstilista').value,
    metodoPago: metodoPago,
    efectivoRecibido: metodoPago === 'Efectivo' ? efectivoRecibido : null,
    vuelto: metodoPago === 'Efectivo' ? vuelto : null,
    items: [...carritoPOS],
    total
  };

  carritoPOS.forEach(cItem => {
    if (cItem.tipo === 'producto') {
      const prod = appData.productos.find(p => p.id === cItem.id);
      if (prod) prod.stock = Math.max(0, prod.stock - cItem.cantidad);
    } else if (cItem.tipo === 'servicio') {
      const serv = appData.servicios.find(s => s.id === cItem.id);
      if (serv) serv.usosCount = (serv.usosCount || 0) + cItem.cantidad;
    }
  });

  appData.ventas.push(venta);
  guardarDatos();
  mostrarTicket(venta);

  carritoPOS = [];
  document.getElementById('posEfectivoRecibido').value = '';
  document.getElementById('posVuelto').innerText = '$0.00';
  renderizarCarritoPOS();
}

function mostrarTicket(venta) {
  const sucursal = appData.sucursales.find(s => s.id === venta.sucursalId)?.nombre || '';
  const cliente = appData.clientes.find(c => c.id === venta.clienteId)?.nombre || 'General';
  const estilista = appData.estilistas.find(e => e.id === venta.estilistaId)?.nombre || 'General';

  document.getElementById('ticketSucursal').innerText = sucursal;
  document.getElementById('ticketFechaHora').innerText = venta.fecha || new Date().toLocaleString();
  document.getElementById('ticketCliente').innerText = cliente;
  document.getElementById('ticketEstilista').innerText = estilista;
  document.getElementById('ticketMetodo').innerText = venta.metodoPago;
  document.getElementById('ticketTotal').innerText = venta.total.toFixed(2);

  const efectivoContainer = document.getElementById('ticketEfectivoContainer');
  if (venta.metodoPago === 'Efectivo' && venta.efectivoRecibido != null) {
    document.getElementById('ticketEfectivo').innerText = venta.efectivoRecibido.toFixed(2);
    document.getElementById('ticketVuelto').innerText = venta.vuelto.toFixed(2);
    efectivoContainer.style.display = 'block';
  } else {
    efectivoContainer.style.display = 'none';
  }

  document.getElementById('ticketDetalles').innerHTML = venta.items.map(i => `
    <div style="display:flex; justify-content:space-between;">
      <span>${i.cantidad}x ${i.nombre}</span>
      <span>$${(i.precio * i.cantidad).toFixed(2)}</span>
    </div>
  `).join('');

  abrirModal('modalTicket');
}

function reimprimirTicket(ventaId) {
  const venta = appData.ventas.find(v => v.id === ventaId);
  if (venta) {
    mostrarTicket(venta);
  } else {
    alert('Factura no encontrada');
  }
}

// ESTILISTAS
function calcularEstadisticasEstilista(estilistaId) {
  let totalServicios = 0;
  let totalGanancias = 0;

  appData.ventas.forEach(v => {
    if (v.estilistaId === estilistaId && Array.isArray(v.items)) {
      v.items.forEach(item => {
        if (item.tipo === 'servicio') {
          totalServicios += (item.cantidad || 1);
        }
      });
      totalGanancias += (v.total || 0);
    }
  });

  return { totalServicios, totalGanancias };
}

function renderizarEstilistas() {
  const container = document.getElementById('listaEstilistas');
  const estilistasSucursal = appData.estilistas.filter(e => e.sucursalId === appData.sucursalActiva);

  if (estilistasSucursal.length === 0) {
    container.innerHTML = `
      <div class="card text-center" style="grid-column: 1 / -1; padding: 2rem;">
        <p style="color: var(--text-secondary);">No hay estilistas registrados en esta sucursal.</p>
      </div>`;
    return;
  }

  const totalServiciosSucursal = estilistasSucursal.reduce((acc, est) => {
    return acc + calcularEstadisticasEstilista(est.id).totalServicios;
  }, 0);

  container.innerHTML = estilistasSucursal.map(e => {
    const stats = calcularEstadisticasEstilista(e.id);
    const porcentajeParticipacion = totalServiciosSucursal > 0 
      ? Math.round((stats.totalServicios / totalServiciosSucursal) * 100) 
      : 0;

    return `
      <div class="card text-center">
        <i class="fa-solid fa-circle-user" style="font-size:3rem; color: var(--accent);"></i>
        <h3 style="margin-top:0.5rem;">${e.nombre}</h3>
        <p style="color:var(--text-secondary); font-size:0.85rem;">Cédula: ${e.cedula || 'N/A'}</p>
        <p style="color:var(--text-secondary); font-size:0.85rem;">Nacimiento: ${e.nacimiento || 'N/A'}</p>
        
        <div style="background: var(--bg-primary); padding: 0.75rem; border-radius: 8px; margin: 0.75rem 0; border: 1px solid var(--border-color); text-align: left;">
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
            <span style="color: var(--text-secondary);">Servicios realizados:</span>
            <strong>${stats.totalServicios} (${porcentajeParticipacion}%)</strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
            <span style="color: var(--text-secondary);">Ganancias generadas:</span>
            <strong style="color: var(--emerald);">$${stats.totalGanancias.toFixed(2)}</strong>
          </div>
        </div>

        <div style="border-top:1px solid var(--border-color); padding-top:0.5rem; display: flex; justify-content: flex-end; align-items: center;">
          <div style="display: flex; gap: 0.25rem;">
            <button class="btn btn-primary btn-sm admin-only ${esSuperAdmin ? 'unlocked' : ''}" onclick="abrirModalEstilista('${e.id}')" title="Editar Estilista">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="btn btn-danger btn-sm admin-only ${esSuperAdmin ? 'unlocked' : ''}" onclick="eliminarEstilista('${e.id}')" title="Eliminar Estilista">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function exportarEstilistasExcel() {
  const estilistasSucursal = appData.estilistas.filter(e => e.sucursalId === appData.sucursalActiva);
  if (!estilistasSucursal || estilistasSucursal.length === 0) {
    alert('No hay estilistas registrados en esta sucursal para exportar.');
    return;
  }

  let csvContent = "\uFEFF";
  csvContent += "Nombre;Cédula;Fecha de Nacimiento;Servicios Realizados;Ganancias Generadas ($)\n";

  estilistasSucursal.forEach(e => {
    const stats = calcularEstadisticasEstilista(e.id);
    const nombre = `"${(e.nombre || '').replace(/"/g, '""')}"`;
    const cedula = `"${(e.cedula || 'N/A').replace(/"/g, '""')}"`;
    const nacimiento = `"${(e.nacimiento || 'N/A').replace(/"/g, '""')}"`;
    const servicios = stats.totalServicios;
    const ganancias = stats.totalGanancias.toFixed(2);

    csvContent += `${nombre};${cedula};${nacimiento};${servicios};${ganancias}\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  const sucursalActual = appData.sucursales.find(s => s.id === appData.sucursalActiva)?.nombre || 'Sucursal';
  const fechaHoy = new Date().toISOString().split('T')[0];
  link.setAttribute('href', url);
  link.setAttribute('download', `Estilistas_${sucursalActual.replace(/\s+/g, '_')}_${fechaHoy}.csv`);
  document.body.appendChild(link);
  
  link.click();
  document.body.removeChild(link);
}

function abrirModalEstilista(id = null) {
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');
  const titulo = document.getElementById('modalEstilistaTitulo');
  if (id) {
    titulo.innerText = 'Editar Estilista';
    const estilista = appData.estilistas.find(e => e.id === id);
    if (estilista) {
      document.getElementById('estilistaId').value = estilista.id;
      document.getElementById('estilistaNombre').value = estilista.nombre;
      document.getElementById('estilistaCedula').value = estilista.cedula || '';
      document.getElementById('estilistaNacimiento').value = estilista.nacimiento || '';
    }
  } else {
    titulo.innerText = 'Registrar Estilista';
    document.getElementById('formEstilista').reset();
    document.getElementById('estilistaId').value = '';
  }
  abrirModal('modalEstilista');
}

function guardarEstilista(e) {
  e.preventDefault();
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');

  const id = document.getElementById('estilistaId').value;
  const nombre = document.getElementById('estilistaNombre').value;
  const cedula = document.getElementById('estilistaCedula').value;
  const nacimiento = document.getElementById('estilistaNacimiento').value;

  if (id) {
    const estilista = appData.estilistas.find(e => e.id === id);
    if (estilista) {
      estilista.nombre = nombre;
      estilista.cedula = cedula;
      estilista.nacimiento = nacimiento;
    }
  } else {
    const nuevo = {
      id: 'e_' + Date.now(),
      sucursalId: appData.sucursalActiva,
      nombre,
      cedula,
      nacimiento
    };
    appData.estilistas.push(nuevo);
  }

  guardarDatos();
  cerrarModal('modalEstilista');
  renderizarEstilistas();
  poblarSelects();
}

function eliminarEstilista(id) {
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');

  const estilista = appData.estilistas.find(e => e.id === id);
  const nombre = estilista ? estilista.nombre : 'este estilista';

  if (confirm(`¿Estás seguro de eliminar a ${nombre}?`)) {
    appData.estilistas = appData.estilistas.filter(e => e.id !== id);
    guardarDatos();
    renderizarEstilistas();
    poblarSelects();
  }
}

// INVENTARIO & SERVICIOS
function cambiarTabInventario(tab, btn) {
  document.querySelectorAll('#mod-inventario .tab-link').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (tab === 'productos') {
    document.getElementById('submod-productos').style.display = 'block';
    document.getElementById('submod-servicios').style.display = 'none';
  } else {
    document.getElementById('submod-productos').style.display = 'none';
    document.getElementById('submod-servicios').style.display = 'block';
    renderizarServiciosInventario();
  }
}

function renderizarInventario() {
  const tbody = document.getElementById('listaProductos');
  const prodsSucursal = appData.productos.filter(p => p.sucursalId === appData.sucursalActiva);
  const stockMaxRef = 50;

  tbody.innerHTML = prodsSucursal.map(p => {
    const fecha = p.fechaCreacion || 'N/A';
    const porcentaje = Math.min(100, Math.round((p.stock / stockMaxRef) * 100));
    const esBajo = p.stock <= 5;
    const barClass = esBajo ? 'bg-danger' : (porcentaje < 40 ? 'bg-amber' : 'bg-emerald');

    return `
      <tr>
        <td><strong>${p.nombre}</strong></td>
        <td>${p.categoria}</td>
        <td>$${p.precio.toFixed(2)}</td>
        <td>${fecha}</td>
        <td>
          <div class="stock-container">
            <span class="stock-num">${p.stock} u. (${porcentaje}%)</span>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill ${barClass}" style="width: ${porcentaje}%;"></div>
            </div>
          </div>
        </td>
        <td>
          ${esBajo 
            ? '<span class="badge-status badge-Cancelada"><i class="fa-solid fa-triangle-exclamation"></i> Bajo (≤5)</span>' 
            : '<span class="badge-status badge-Completada">OK</span>'}
        </td>
        <td>
          <button class="btn btn-primary btn-sm admin-only ${esSuperAdmin ? 'unlocked' : ''}" onclick="abrirModalProducto('${p.id}')" title="Editar Producto">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn btn-danger btn-sm admin-only ${esSuperAdmin ? 'unlocked' : ''}" onclick="eliminarProducto('${p.id}')" title="Eliminar Producto">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  renderizarServiciosInventario();
}

function comprobarAvisoCompraInventario() {
  const prodsBajos = appData.productos.filter(p => p.sucursalId === appData.sucursalActiva && p.stock <= 5);
  if (prodsBajos.length > 0) {
    const listaHtml = prodsBajos.map(p => `
      <li style="padding: 8px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
        <span><strong>${p.nombre}</strong> (${p.categoria})</span>
        <span class="badge-status badge-Cancelada">Quedan ${p.stock} unid.</span>
      </li>
    `).join('');
    
    document.getElementById('listaAvisoCompraProductos').innerHTML = listaHtml;
    abrirModal('modalAvisoCompra');
  }
}

function eliminarProducto(id) {
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');
  if (confirm('¿Estás seguro de eliminar este producto?')) {
    appData.productos = appData.productos.filter(p => p.id !== id);
    guardarDatos();
    renderizarInventario();
  }
}

function renderizarServiciosInventario() {
  const tbody = document.getElementById('listaServiciosInventario');
  if (!tbody) return;

  tbody.innerHTML = appData.servicios.map(s => {
    const fecha = s.fechaCreacion || 'N/A';
    const usos = s.usosCount || 0;
    return `
      <tr>
        <td><strong>${s.nombre}</strong></td>
        <td>$${s.precio.toFixed(2)}</td>
        <td>${fecha}</td>
        <td>
          <span class="badge-status badge-Confirmada"><i class="fa-solid fa-chart-line"></i> ${usos} usos</span>
        </td>
        <td>${s.tipo.toUpperCase()}</td>
        <td>
          <button class="btn btn-primary btn-sm admin-only ${esSuperAdmin ? 'unlocked' : ''}" onclick="abrirModalServicio('${s.id}')" title="Editar Servicio">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn btn-danger btn-sm admin-only ${esSuperAdmin ? 'unlocked' : ''}" onclick="eliminarServicio('${s.id}')" title="Eliminar Servicio">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function eliminarServicio(id) {
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');
  if (confirm('¿Estás seguro de eliminar este servicio?')) {
    appData.servicios = appData.servicios.filter(s => s.id !== id);
    guardarDatos();
    renderizarServiciosInventario();
    renderizarPOS();
  }
}

// CLIENTES (Módulo de Fidelización & Permisos)
function calcularServiciosCliente(clienteId) {
  let contador = 0;
  appData.ventas.forEach(v => {
    if (v.clienteId === clienteId && Array.isArray(v.items)) {
      v.items.forEach(item => {
        if (item.tipo === 'servicio') {
          contador += (item.cantidad || 1);
        }
      });
    }
  });
  return contador;
}

function renderizarClientes() {
  const tbody = document.getElementById('listaClientes');
  const busqueda = document.getElementById('buscarCliente').value.toLowerCase();
  const filtroFecha = document.getElementById('filtroFechaCreacion').value;

  const filtrados = appData.clientes.filter(c => {
    const coincideTexto = c.nombre.toLowerCase().includes(busqueda) || c.telefono.includes(busqueda);
    const coincideFecha = filtroFecha ? c.fechaCreacion === filtroFecha : true;
    return coincideTexto && coincideFecha;
  });

  tbody.innerHTML = filtrados.map(c => {
    const totalServicios = calcularServiciosCliente(c.id);
    const metaCortes = 10;
    const pctInt = Math.min(100, Math.round((totalServicios / metaCortes) * 100));
    const esGratis = totalServicios >= metaCortes;

    let badgeFidelidad = '';
    if (esGratis) {
      badgeFidelidad = `
        <button class="btn-loyalty-green" onclick="enviarSmsGratisWhatsApp('${c.id}')" title="¡Corte Gratis Alcanzado! Click para enviar WhatsApp">
          <i class="fa-brands fa-whatsapp"></i> ${pctInt}% (${totalServicios}/${metaCortes}) ¡Corte Gratis!
        </button>`;
    } else {
      badgeFidelidad = `
        <span class="badge-loyalty-progress">
          ${pctInt}% (${totalServicios}/${metaCortes})
        </span>`;
    }

    return `
      <tr>
        <td><strong>${c.nombre}</strong></td>
        <td>${c.telefono}</td>
        <td>${c.email || 'N/A'}</td>
        <td>${c.nacimiento || 'N/A'}</td>
        <td>${c.fechaCreacion || 'N/A'}</td>
        <td>${badgeFidelidad}</td>
        <td>${c.notas || '-'}</td>
        <td>
          <button class="btn btn-primary btn-sm admin-only ${esSuperAdmin ? 'unlocked' : ''}" onclick="abrirModalCliente('${c.id}')" title="Editar Cliente">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn btn-danger btn-sm admin-only ${esSuperAdmin ? 'unlocked' : ''}" onclick="eliminarCliente('${c.id}')" title="Eliminar Cliente">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function enviarSmsGratisWhatsApp(clienteId) {
  const cli = appData.clientes.find(c => c.id === clienteId);
  if (!cli) return;

  const numLimpio = cli.telefono.replace(/\D/g, '');
  const mensaje = `¡Hola ${cli.nombre}! 🎉 En Leguend Barber Studio queremos premiar tu preferencia. Has completado tus 10 servicios acumulados y ¡ya tienes un CORTE TOTALMENTE GRATIS! ✂️🔥 Visítanos en tu sucursal más cercana para reclamar tu premio.`;
  const urlWs = `https://wa.me/${numLimpio}?text=${encodeURIComponent(mensaje)}`;

  window.open(urlWs, '_blank');
}

function eliminarCliente(id) {
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');
  if (confirm('¿Estás seguro de eliminar este cliente?')) {
    appData.clientes = appData.clientes.filter(c => c.id !== id);
    guardarDatos();
    renderizarClientes();
  }
}

// EXPORTAR CLIENTES Y VENTAS A EXCEL
function exportarClientesExcel() {
  if (!appData.clientes || appData.clientes.length === 0) {
    alert('No hay clientes registrados para exportar.');
    return;
  }

  let csvContent = "\uFEFF";
  csvContent += "Nombre;Teléfono;Email;Fecha de Nacimiento;Fecha de Creación;Servicios Realizados;Notas\n";

  appData.clientes.forEach(c => {
    const totalServ = calcularServiciosCliente(c.id);
    const nombre = `"${(c.nombre || '').replace(/"/g, '""')}"`;
    const telefono = `"${(c.telefono || '').replace(/"/g, '""')}"`;
    const email = `"${(c.email || 'N/A').replace(/"/g, '""')}"`;
    const nacimiento = `"${(c.nacimiento || 'N/A').replace(/"/g, '""')}"`;
    const fechaCreacion = `"${(c.fechaCreacion || 'N/A').replace(/"/g, '""')}"`;
    const notas = `"${(c.notas || '-').replace(/"/g, '""')}"`;

    csvContent += `${nombre};${telefono};${email};${nacimiento};${fechaCreacion};${totalServ};${notas}\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  const fechaHoy = new Date().toISOString().split('T')[0];
  link.setAttribute('href', url);
  link.setAttribute('download', `Clientes_Peluqueria_${fechaHoy}.csv`);
  document.body.appendChild(link);
  
  link.click();
  document.body.removeChild(link);
}

function exportarVentasExcel() {
  const ventasSucursal = appData.ventas.filter(v => v.sucursalId === appData.sucursalActiva);
  if (!ventasSucursal || ventasSucursal.length === 0) {
    alert('No hay ventas registradas en esta sucursal para exportar.');
    return;
  }

  let csvContent = "\uFEFF";
  csvContent += "Fecha;Cliente;Estilista;Método de Pago;Total ($)\n";

  ventasSucursal.forEach(v => {
    const cliente = appData.clientes.find(c => c.id === v.clienteId)?.nombre || 'Cliente Ocasional';
    const estilista = appData.estilistas.find(e => e.id === v.estilistaId)?.nombre || 'Sin Asignar';
    const fecha = `"${(v.fecha || '').replace(/"/g, '""')}"`;
    const cliNombre = `"${cliente.replace(/"/g, '""')}"`;
    const estNombre = `"${estilista.replace(/"/g, '""')}"`;
    const metodoPago = `"${(v.metodoPago || '').replace(/"/g, '""')}"`;
    const total = v.total.toFixed(2);

    csvContent += `${fecha};${cliNombre};${estNombre};${metodoPago};${total}\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  const sucursalActual = appData.sucursales.find(s => s.id === appData.sucursalActiva)?.nombre || 'Sucursal';
  const fechaHoy = new Date().toISOString().split('T')[0];
  link.setAttribute('href', url);
  link.setAttribute('download', `Ventas_${sucursalActual.replace(/\s+/g, '_')}_${fechaHoy}.csv`);
  document.body.appendChild(link);
  
  link.click();
  document.body.removeChild(link);
}

// MODALES & AUXILIARES
function abrirModal(id) { document.getElementById(id).classList.add('active'); }
function cerrarModal(id) { document.getElementById(id).classList.remove('active'); }

function abrirModalProducto(id = null) {
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');
  const titulo = document.getElementById('modalProductoTitulo');
  if (id) {
    titulo.innerText = 'Editar Producto';
    const prod = appData.productos.find(p => p.id === id);
    if (prod) {
      document.getElementById('prodId').value = prod.id;
      document.getElementById('prodNombre').value = prod.nombre;
      document.getElementById('prodCategoria').value = prod.categoria;
      document.getElementById('prodPrecio').value = prod.precio;
      document.getElementById('prodStock').value = prod.stock;
    }
  } else {
    titulo.innerText = 'Agregar Producto';
    document.getElementById('formProducto').reset();
    document.getElementById('prodId').value = '';
  }
  abrirModal('modalProducto');
}

function abrirModalServicio(id = null) {
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');
  const titulo = document.getElementById('modalServicioTitulo');
  if (id) {
    titulo.innerText = 'Editar Servicio';
    const serv = appData.servicios.find(s => s.id === id);
    if (serv) {
      document.getElementById('servId').value = serv.id;
      document.getElementById('servNombre').value = serv.nombre;
      document.getElementById('servPrecio').value = serv.precio;
    }
  } else {
    titulo.innerText = 'Agregar Servicio';
    document.getElementById('formServicio').reset();
    document.getElementById('servId').value = '';
  }
  abrirModal('modalServicio');
}

function abrirModalCliente(id = null) {
  if (id && !esSuperAdmin) return alert('Requiere permisos de Super Admin para editar clientes');

  const titulo = document.getElementById('modalClienteTitulo');
  if (id) {
    titulo.innerText = 'Editar Cliente';
    const cli = appData.clientes.find(c => c.id === id);
    if (cli) {
      document.getElementById('cliId').value = cli.id;
      document.getElementById('cliNombre').value = cli.nombre;
      document.getElementById('cliTelefono').value = cli.telefono;
      document.getElementById('cliEmail').value = cli.email || '';
      document.getElementById('cliNacimiento').value = cli.nacimiento || '';
      document.getElementById('cliNotas').value = cli.notas || '';
    }
  } else {
    titulo.innerText = 'Registrar Cliente';
    document.getElementById('formCliente').reset();
    document.getElementById('cliId').value = '';
  }
  abrirModal('modalCliente');
}

function abrirModalSucursal() {
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');
  abrirModal('modalSucursal');
}

function poblarSelects() {
  const posCli = document.getElementById('posCliente');
  const posEst = document.getElementById('posEstilista');

  const estilistasSucursal = appData.estilistas.filter(e => e.sucursalId === appData.sucursalActiva);

  const cliOpt = appData.clientes.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('');
  const estOpt = estilistasSucursal.map(e => `<option value="${e.id}">${e.nombre}</option>`).join('');

  if (posCli) posCli.innerHTML = `<option value="">Cliente Ocasional</option>` + cliOpt;
  if (posEst) posEst.innerHTML = `<option value="">Sin Asignar</option>` + estOpt;
}

function guardarProducto(e) {
  e.preventDefault();
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');

  const id = document.getElementById('prodId').value;
  const nombre = document.getElementById('prodNombre').value;
  const categoria = document.getElementById('prodCategoria').value;
  const precio = parseFloat(document.getElementById('prodPrecio').value);
  const stock = parseInt(document.getElementById('prodStock').value);

  if (id) {
    const prod = appData.productos.find(p => p.id === id);
    if (prod) {
      prod.nombre = nombre;
      prod.categoria = categoria;
      prod.precio = precio;
      prod.stock = stock;
    }
  } else {
    const nuevo = {
      id: 'p_' + Date.now(),
      sucursalId: appData.sucursalActiva,
      nombre,
      categoria,
      precio,
      stock,
      fechaCreacion: new Date().toISOString().split('T')[0],
      tipo: 'producto'
    };
    appData.productos.push(nuevo);
  }

  guardarDatos();
  cerrarModal('modalProducto');
  renderizarInventario();
}

function guardarServicio(e) {
  e.preventDefault();
  if (!esSuperAdmin) return alert('Requiere permisos de Super Admin');

  const id = document.getElementById('servId').value;
  const nombre = document.getElementById('servNombre').value;
  const precio = parseFloat(document.getElementById('servPrecio').value);

  if (id) {
    const serv = appData.servicios.find(s => s.id === id);
    if (serv) {
      serv.nombre = nombre;
      serv.precio = precio;
    }
  } else {
    const nuevo = {
      id: 's_' + Date.now(),
      nombre,
      precio,
      fechaCreacion: new Date().toISOString().split('T')[0],
      usosCount: 0,
      tipo: 'servicio'
    };
    appData.servicios.push(nuevo);
  }

  guardarDatos();
  cerrarModal('modalServicio');
  renderizarServiciosInventario();
  renderizarPOS();
}

function guardarCliente(e) {
  e.preventDefault();

  const id = document.getElementById('cliId').value;
  if (id && !esSuperAdmin) {
    return alert('Requiere permisos de Super Admin para modificar información de un cliente existente.');
  }

  const nombre = document.getElementById('cliNombre').value;
  const telefono = document.getElementById('cliTelefono').value;
  const email = document.getElementById('cliEmail').value;
  const nacimiento = document.getElementById('cliNacimiento').value;
  const notas = document.getElementById('cliNotas').value;

  if (id) {
    const cli = appData.clientes.find(c => c.id === id);
    if (cli) {
      cli.nombre = nombre;
      cli.telefono = telefono;
      cli.email = email;
      cli.nacimiento = nacimiento;
      cli.notas = notas;
    }
  } else {
    const nuevo = {
      id: 'c_' + Date.now(),
      nombre,
      telefono,
      email,
      nacimiento,
      fechaCreacion: new Date().toISOString().split('T')[0],
      notas
    };
    appData.clientes.push(nuevo);
  }

  guardarDatos();
  cerrarModal('modalCliente');
  renderizarClientes();
  poblarSelects();
}

function setupTema() {
  document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
  });
}