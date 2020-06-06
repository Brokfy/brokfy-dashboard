import React from 'react';

const ReporteContenido = (props) => {
    return (
        <div className="ibox-content m-b-sm border-bottom">
            <div className="p-xs">
                <table class="footable table table-stripped footable-loaded default" data-page-size="8" data-filter="#filter">
                                <thead>
                                <tr>
                                    <th class="footable-visible footable-first-column footable-sortable">Rendering engine<span class="footable-sort-indicator"></span></th>
                                    <th class="footable-visible footable-sortable">Browser<span class="footable-sort-indicator"></span></th>
                                    <th data-hide="phone,tablet" class="footable-visible footable-sortable">Platform(s)<span class="footable-sort-indicator"></span></th>
                                    <th data-hide="phone,tablet" class="footable-visible footable-sortable">Engine version<span class="footable-sort-indicator"></span></th>
                                    <th data-hide="phone,tablet" class="footable-visible footable-last-column footable-sortable">CSS grade<span class="footable-sort-indicator"></span></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="gradeX footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Trident</td>
                                    <td class="footable-visible">Internet
                                        Explorer 4.0
                                    </td>
                                    <td class="footable-visible">Win 95+</td>
                                    <td class="center footable-visible">4</td>
                                    <td class="center footable-visible footable-last-column">X</td>
                                </tr>
                                <tr class="gradeC footable-odd" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Trident</td>
                                    <td class="footable-visible">Internet
                                        Explorer 5.0
                                    </td>
                                    <td class="footable-visible">Win 95+</td>
                                    <td class="center footable-visible">5</td>
                                    <td class="center footable-visible footable-last-column">C</td>
                                </tr>
                                <tr class="gradeA footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Trident</td>
                                    <td class="footable-visible">Internet
                                        Explorer 5.5
                                    </td>
                                    <td class="footable-visible">Win 95+</td>
                                    <td class="center footable-visible">5.5</td>
                                    <td class="center footable-visible footable-last-column">A</td>
                                </tr>
                                <tr class="gradeA footable-odd" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Gecko</td>
                                    <td class="footable-visible">Netscape Navigator 9</td>
                                    <td class="footable-visible">Win 98+ / OSX.2+</td>
                                    <td class="center footable-visible">1.8</td>
                                    <td class="center footable-visible footable-last-column">A</td>
                                </tr>

                                <tr class="gradeA footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Webkit</td>
                                    <td class="footable-visible">Safari 1.3</td>
                                    <td class="footable-visible">OSX.3</td>
                                    <td class="center footable-visible">312.8</td>
                                    <td class="center footable-visible footable-last-column">A</td>
                                </tr>
                                <tr class="gradeA footable-odd" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Webkit</td>
                                    <td class="footable-visible">Safari 2.0</td>
                                    <td class="footable-visible">OSX.4+</td>
                                    <td class="center footable-visible">419.3</td>
                                    <td class="center footable-visible footable-last-column">A</td>
                                </tr>
                                <tr class="gradeA footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Webkit</td>
                                    <td class="footable-visible">Safari 3.0</td>
                                    <td class="footable-visible">OSX.4+</td>
                                    <td class="center footable-visible">522.1</td>
                                    <td class="center footable-visible footable-last-column">A</td>
                                </tr>
                                <tr class="gradeA footable-odd" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Webkit</td>
                                    <td class="footable-visible">OmniWeb 5.5</td>
                                    <td class="footable-visible">OSX.4+</td>
                                    <td class="center footable-visible">420</td>
                                    <td class="center footable-visible footable-last-column">A</td>
                                </tr>
                                <tr class="gradeA footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Webkit</td>
                                    <td class="footable-visible">iPod Touch / iPhone</td>
                                    <td class="footable-visible">iPod</td>
                                    <td class="center footable-visible">420.1</td>
                                    <td class="center footable-visible footable-last-column">A</td>
                                </tr>
                                <tr class="gradeA footable-odd" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Webkit</td>
                                    <td class="footable-visible">S60</td>
                                    <td class="footable-visible">S60</td>
                                    <td class="center footable-visible">413</td>
                                    <td class="center footable-visible footable-last-column">A</td>
                                </tr>
                                <tr class="gradeA footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Presto</td>
                                    <td class="footable-visible">Opera 7.0</td>
                                    <td class="footable-visible">Win 95+ / OSX.1+</td>
                                    <td class="center footable-visible">-</td>
                                    <td class="center footable-visible footable-last-column">A</td>
                                </tr>
                                <tr class="gradeA footable-odd" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Presto</td>
                                    <td class="footable-visible">Opera 7.5</td>
                                    <td class="footable-visible">Win 95+ / OSX.2+</td>
                                    <td class="center footable-visible">-</td>
                                    <td class="center footable-visible footable-last-column">A</td>
                                </tr>
                                <tr class="gradeA footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Presto</td>
                                    <td class="footable-visible">Opera 8.0</td>
                                    <td class="footable-visible">Win 95+ / OSX.2+</td>
                                    <td class="center footable-visible">-</td>
                                    <td class="center footable-visible footable-last-column">A</td>
                                </tr>
                                <tr class="gradeA footable-odd" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Presto</td>
                                    <td class="footable-visible">Opera 8.5</td>
                                    <td class="footable-visible">Win 95+ / OSX.2+</td>
                                    <td class="center footable-visible">-</td>
                                    <td class="center footable-visible footable-last-column">A</td>
                                </tr>
                                <tr class="gradeA footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Presto</td>
                                    <td class="footable-visible">Opera 9.0</td>
                                    <td class="footable-visible">Win 95+ / OSX.3+</td>
                                    <td class="center footable-visible">-</td>
                                    <td class="center footable-visible footable-last-column">A</td>
                                </tr>
                                <tr class="gradeA footable-odd" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Presto</td>
                                    <td class="footable-visible">Opera 9.2</td>
                                    <td class="footable-visible">Win 88+ / OSX.3+</td>
                                    <td class="center footable-visible">-</td>
                                    <td class="center footable-visible footable-last-column">A</td>
                                </tr>
                                <tr class="gradeA footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Presto</td>
                                    <td class="footable-visible">Opera 9.5</td>
                                    <td class="footable-visible">Win 88+ / OSX.3+</td>
                                    <td class="center footable-visible">-</td>
                                    <td class="center footable-visible footable-last-column">A</td>
                                </tr>
                                <tr class="gradeA footable-odd" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Presto</td>
                                    <td class="footable-visible">Opera for Wii</td>
                                    <td class="footable-visible">Wii</td>
                                    <td class="center footable-visible">-</td>
                                    <td class="center footable-visible footable-last-column">A</td>
                                </tr>
                                <tr class="gradeA footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Presto</td>
                                    <td class="footable-visible">Nokia N800</td>
                                    <td class="footable-visible">N800</td>
                                    <td class="center footable-visible">-</td>
                                    <td class="center footable-visible footable-last-column">A</td>
                                </tr>
                                <tr class="gradeA footable-odd" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Presto</td>
                                    <td class="footable-visible">Nintendo DS browser</td>
                                    <td class="footable-visible">Nintendo DS</td>
                                    <td class="center footable-visible">8.5</td>
                                    <td class="center footable-visible footable-last-column">C/A<sup>1</sup></td>
                                </tr>
                                <tr class="gradeC footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>KHTML</td>
                                    <td class="footable-visible">Konqureror 3.1</td>
                                    <td class="footable-visible">KDE 3.1</td>
                                    <td class="center footable-visible">3.1</td>
                                    <td class="center footable-visible footable-last-column">C</td>
                                </tr>
                                <tr class="gradeA footable-odd" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>KHTML</td>
                                    <td class="footable-visible">Konqureror 3.3</td>
                                    <td class="footable-visible">KDE 3.3</td>
                                    <td class="center footable-visible">3.3</td>
                                    <td class="center footable-visible footable-last-column">A</td>
                                </tr>
                                <tr class="gradeA footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>KHTML</td>
                                    <td class="footable-visible">Konqureror 3.5</td>
                                    <td class="footable-visible">KDE 3.5</td>
                                    <td class="center footable-visible">3.5</td>
                                    <td class="center footable-visible footable-last-column">A</td>
                                </tr>
                                <tr class="gradeX footable-odd" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Tasman</td>
                                    <td class="footable-visible">Internet Explorer 4.5</td>
                                    <td class="footable-visible">Mac OS 8-9</td>
                                    <td class="center footable-visible">-</td>
                                    <td class="center footable-visible footable-last-column">X</td>
                                </tr>
                                <tr class="gradeC footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Tasman</td>
                                    <td class="footable-visible">Internet Explorer 5.1</td>
                                    <td class="footable-visible">Mac OS 7.6-9</td>
                                    <td class="center footable-visible">1</td>
                                    <td class="center footable-visible footable-last-column">C</td>
                                </tr>
                                <tr class="gradeC footable-odd" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Tasman</td>
                                    <td class="footable-visible">Internet Explorer 5.2</td>
                                    <td class="footable-visible">Mac OS 8-X</td>
                                    <td class="center footable-visible">1</td>
                                    <td class="center footable-visible footable-last-column">C</td>
                                </tr>
                                <tr class="gradeA footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Misc</td>
                                    <td class="footable-visible">NetFront 3.1</td>
                                    <td class="footable-visible">Embedded devices</td>
                                    <td class="center footable-visible">-</td>
                                    <td class="center footable-visible footable-last-column">C</td>
                                </tr>
                                <tr class="gradeA footable-odd" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Misc</td>
                                    <td class="footable-visible">NetFront 3.4</td>
                                    <td class="footable-visible">Embedded devices</td>
                                    <td class="center footable-visible">-</td>
                                    <td class="center footable-visible footable-last-column">A</td>
                                </tr>
                                <tr class="gradeX footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Misc</td>
                                    <td class="footable-visible">Dillo 0.8</td>
                                    <td class="footable-visible">Embedded devices</td>
                                    <td class="center footable-visible">-</td>
                                    <td class="center footable-visible footable-last-column">X</td>
                                </tr>
                                <tr class="gradeX footable-odd" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Misc</td>
                                    <td class="footable-visible">Links</td>
                                    <td class="footable-visible">Text only</td>
                                    <td class="center footable-visible">-</td>
                                    <td class="center footable-visible footable-last-column">X</td>
                                </tr>
                                <tr class="gradeX footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Misc</td>
                                    <td class="footable-visible">Lynx</td>
                                    <td class="footable-visible">Text only</td>
                                    <td class="center footable-visible">-</td>
                                    <td class="center footable-visible footable-last-column">X</td>
                                </tr>
                                <tr class="gradeC footable-odd" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Misc</td>
                                    <td class="footable-visible">IE Mobile</td>
                                    <td class="footable-visible">Windows Mobile 6</td>
                                    <td class="center footable-visible">-</td>
                                    <td class="center footable-visible footable-last-column">C</td>
                                </tr>
                                <tr class="gradeC footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Misc</td>
                                    <td class="footable-visible">PSP browser</td>
                                    <td class="footable-visible">PSP</td>
                                    <td class="center footable-visible">-</td>
                                    <td class="center footable-visible footable-last-column">C</td>
                                </tr>
                                <tr class="gradeU footable-odd" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Other browsers</td>
                                    <td class="footable-visible">All others</td>
                                    <td class="footable-visible">-</td>
                                    <td class="center footable-visible">-</td>
                                    <td class="center footable-visible footable-last-column">U</td>
                                </tr>




                                <tr class="gradeX footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Trident</td>
                                    <td class="footable-visible">Internet
                                        Explorer 4.0
                                    </td>
                                    <td class="footable-visible">Win 95+</td>
                                    <td class="center footable-visible">4</td>
                                    <td class="center footable-visible footable-last-column">X</td>
                                </tr>

                                <tr class="gradeX footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Trident</td>
                                    <td class="footable-visible">Internet
                                        Explorer 4.0
                                    </td>
                                    <td class="footable-visible">Win 95+</td>
                                    <td class="center footable-visible">4</td>
                                    <td class="center footable-visible footable-last-column">X</td>
                                </tr>

                                <tr class="gradeX footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Trident</td>
                                    <td class="footable-visible">Internet
                                        Explorer 4.0
                                    </td>
                                    <td class="footable-visible">Win 95+</td>
                                    <td class="center footable-visible">4</td>
                                    <td class="center footable-visible footable-last-column">X</td>
                                </tr>

                                <tr class="gradeX footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Trident</td>
                                    <td class="footable-visible">Internet
                                        Explorer 4.0
                                    </td>
                                    <td class="footable-visible">Win 95+</td>
                                    <td class="center footable-visible">4</td>
                                    <td class="center footable-visible footable-last-column">X</td>
                                </tr>

                                <tr class="gradeX footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Trident</td>
                                    <td class="footable-visible">Internet
                                        Explorer 4.0
                                    </td>
                                    <td class="footable-visible">Win 95+</td>
                                    <td class="center footable-visible">4</td>
                                    <td class="center footable-visible footable-last-column">X</td>
                                </tr>

                                <tr class="gradeX footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Trident</td>
                                    <td class="footable-visible">Internet
                                        Explorer 4.0
                                    </td>
                                    <td class="footable-visible">Win 95+</td>
                                    <td class="center footable-visible">4</td>
                                    <td class="center footable-visible footable-last-column">X</td>
                                </tr>

                                <tr class="gradeX footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Trident</td>
                                    <td class="footable-visible">Internet
                                        Explorer 4.0
                                    </td>
                                    <td class="footable-visible">Win 95+</td>
                                    <td class="center footable-visible">4</td>
                                    <td class="center footable-visible footable-last-column">X</td>
                                </tr>

                                <tr class="gradeX footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Trident</td>
                                    <td class="footable-visible">Internet
                                        Explorer 4.0
                                    </td>
                                    <td class="footable-visible">Win 95+</td>
                                    <td class="center footable-visible">4</td>
                                    <td class="center footable-visible footable-last-column">X</td>
                                </tr>

                                <tr class="gradeX footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Trident</td>
                                    <td class="footable-visible">Internet
                                        Explorer 4.0
                                    </td>
                                    <td class="footable-visible">Win 95+</td>
                                    <td class="center footable-visible">4</td>
                                    <td class="center footable-visible footable-last-column">X</td>
                                </tr>

                                <tr class="gradeX footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Trident</td>
                                    <td class="footable-visible">Internet
                                        Explorer 4.0
                                    </td>
                                    <td class="footable-visible">Win 95+</td>
                                    <td class="center footable-visible">4</td>
                                    <td class="center footable-visible footable-last-column">X</td>
                                </tr>

                                <tr class="gradeX footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Trident</td>
                                    <td class="footable-visible">Internet
                                        Explorer 4.0
                                    </td>
                                    <td class="footable-visible">Win 95+</td>
                                    <td class="center footable-visible">4</td>
                                    <td class="center footable-visible footable-last-column">X</td>
                                </tr>

                                <tr class="gradeX footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Trident</td>
                                    <td class="footable-visible">Internet
                                        Explorer 4.0
                                    </td>
                                    <td class="footable-visible">Win 95+</td>
                                    <td class="center footable-visible">4</td>
                                    <td class="center footable-visible footable-last-column">X</td>
                                </tr>

                                <tr class="gradeX footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Trident</td>
                                    <td class="footable-visible">Internet
                                        Explorer 4.0
                                    </td>
                                    <td class="footable-visible">Win 95+</td>
                                    <td class="center footable-visible">4</td>
                                    <td class="center footable-visible footable-last-column">X</td>
                                </tr>

                                <tr class="gradeX footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Trident</td>
                                    <td class="footable-visible">Internet
                                        Explorer 4.0
                                    </td>
                                    <td class="footable-visible">Win 95+</td>
                                    <td class="center footable-visible">4</td>
                                    <td class="center footable-visible footable-last-column">X</td>
                                </tr>

                                <tr class="gradeX footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Trident</td>
                                    <td class="footable-visible">Internet
                                        Explorer 4.0
                                    </td>
                                    <td class="footable-visible">Win 95+</td>
                                    <td class="center footable-visible">4</td>
                                    <td class="center footable-visible footable-last-column">X</td>
                                </tr>

                                <tr class="gradeX footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Trident</td>
                                    <td class="footable-visible">Internet
                                        Explorer 4.0
                                    </td>
                                    <td class="footable-visible">Win 95+</td>
                                    <td class="center footable-visible">4</td>
                                    <td class="center footable-visible footable-last-column">X</td>
                                </tr>

                                <tr class="gradeX footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Trident</td>
                                    <td class="footable-visible">Internet
                                        Explorer 4.0
                                    </td>
                                    <td class="footable-visible">Win 95+</td>
                                    <td class="center footable-visible">4</td>
                                    <td class="center footable-visible footable-last-column">X</td>
                                </tr>

                                <tr class="gradeX footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Trident</td>
                                    <td class="footable-visible">Internet
                                        Explorer 4.0
                                    </td>
                                    <td class="footable-visible">Win 95+</td>
                                    <td class="center footable-visible">4</td>
                                    <td class="center footable-visible footable-last-column">X</td>
                                </tr>

                                <tr class="gradeX footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Trident</td>
                                    <td class="footable-visible">Internet
                                        Explorer 4.0
                                    </td>
                                    <td class="footable-visible">Win 95+</td>
                                    <td class="center footable-visible">4</td>
                                    <td class="center footable-visible footable-last-column">X</td>
                                </tr>

                                <tr class="gradeX footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Trident</td>
                                    <td class="footable-visible">Internet
                                        Explorer 4.0
                                    </td>
                                    <td class="footable-visible">Win 95+</td>
                                    <td class="center footable-visible">4</td>
                                    <td class="center footable-visible footable-last-column">X</td>
                                </tr>

                                <tr class="gradeX footable-even" >
                                    <td class="footable-visible footable-first-column"><span class="footable-toggle"></span>Trident</td>
                                    <td class="footable-visible">Internet
                                        Explorer 4.0
                                    </td>
                                    <td class="footable-visible">Win 95+</td>
                                    <td class="center footable-visible">4</td>
                                    <td class="center footable-visible footable-last-column">X</td>
                                </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
    );
}

export default ReporteContenido;