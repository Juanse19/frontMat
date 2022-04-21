/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { delay, takeWhile } from 'rxjs/operators'
import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core'
import { NbThemeService } from '@nebular/theme'
import { SolarEnergyStatistics } from '../../../@core/interfaces/iot/solar'
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { consume } from '../_interfaces/MatBag.model'

declare const echarts: any

@Component({
  selector: 'ngx-solar',
  styleUrls: ['./solar.component.scss'],
  template: `
<div class="container">
<nb-tabset>
        <nb-tab tabTitle="Salidas">
    <div class="row show-grid" >
      <div class="col-md-4">
        <nb-card >
          <nb-card-header>CLEAR LINE</nb-card-header>
          <nb-card-body >
            <div echarts [options]="option" class="echart"></div>
            <div class="info">
              <div class="h4 value"> {{consumeData[4]?.KWh}} kWh</div>
              <div>
                <img
                  src="./assets/img/sfc.png"
                  class="rounded float-right"
                  width="80px"
                  alt="..."
                />
              </div>
            </div>
          </nb-card-body>
        </nb-card>
      </div>

      <!-- <div class="col-md-4">
        <nb-card >
          <nb-card-header>{{consumeData[5]?.ZoneName}}</nb-card-header>
          <nb-card-body>
            <div echarts [options]="options1" class="echart"></div>
            <div class="info">
            <div>
                <img
                  src="./assets/img/sf.png"
                  class="rounded float-right"
                  width="80px"
                  alt="..."
                />
              </div>
              <div class="h4 value"> {{consumeData[5]?.KWh}} kWh</div>
            </div>
          </nb-card-body>
        </nb-card>
      </div> -->

      <!-- <div class="col-md-4">
        <nb-card>
          <nb-card-header>Crossover</nb-card-header>
          <nb-card-body>
            <div echarts [options]="option" class="echart"></div>
            <div class="info">
              <div class="h4 value"> kWh</div>
              
              <div>
                <img
                  src="./assets/img/cr.png"
                  class="rounded float-right"
                  width="80px"
                  alt="..."
                />
              </div>
            </div>
          </nb-card-body>
        </nb-card>
      </div> -->

      <!-- <div class="col-md-6">
        <nb-card>
          <nb-card-header>Transfer Line</nb-card-header>
          <nb-card-body>
            <div echarts [options]="option" class="echart"></div>
            
            <div class="info">
              
                <img
                  src="./assets/img/tx.png"
                  class="rounded float-right"
                  width="80px"
                  alt="..."
                />
              
            </div> 
            <br/>
            
            <div >
            <div class="h4 value">16.521 kWh</div>
            </div>
          </nb-card-body>
        </nb-card>
      </div>

      <div class="col-md-6">
        <nb-card>
          <nb-card-header>{{consumeData[3]?.ZoneName}}</nb-card-header>
          <nb-card-body>
            <div echarts [options]="option" class="echart"></div>
            <div class="info">
              <div class="h4 value">{{consumeData[3]?.KWh}} kWh</div>
              
              <div>
                <img
                  src="./assets/img/mu.png"
                  class="rounded float-right"
                  width="80px"
                  alt="..."
                />
              </div>
            </div>
          </nb-card-body>
        </nb-card>
      </div>

      <div class="col-md-6">
        <nb-card>
          <nb-card-header>Alarm Line</nb-card-header>
          <nb-card-body>
            <div echarts [options]="option" class="echart"></div>
            <div class="info">
              <div class="h4 value">16.521 kWh</div>
              
              <div>
                <img
                  src="./assets/img/al.png"
                  class="rounded float-right"
                  width="80px"
                  alt="..."
                />
              </div>
            </div>
          </nb-card-body>
        </nb-card>
      </div>

      <div class="col-md-6">
        <nb-card>
          <nb-card-header>Clear Line</nb-card-header>
          <nb-card-body>
            <div echarts [options]="option" class="echart"></div>
            <div class="info">
              <div class="h4 value">16.521 kWh</div>
              
              <div>
                <img
                  src="./assets/img/cl.png"
                  class="rounded float-right"
                  width="80px"
                  alt="..."
                />
              </div>
            </div>
          </nb-card-body>
        </nb-card>
      </div>

      <div class="col-md-6">
        <nb-card>
          <nb-card-header>{{consumeData[7]?.ZoneName}}</nb-card-header>
          <nb-card-body>
            <div echarts [options]="option" class="echart"></div>
            <div class="info">
            <div>
                <img
                  src="./assets/img/ss.png"
                  class="rounded float-right"
                  width="80px"
                  alt="..."
                />
              </div>
              <div class="h4 value">{{consumeData[3]?.KWh}} kWh</div>
            </div>
          </nb-card-body>
        </nb-card>
      </div>

      <div class="col-md-6">
        <nb-card>
          <nb-card-header>{{consumeData[4]?.ZoneName}}</nb-card-header>
          <nb-card-body>
            <div echarts [options]="option" class="echart"></div>
            <div class="info">
            <div>
                <img
                  src="./assets/img/osr.png"
                  class="rounded float-right"
                  width="80px"
                  alt="..."
                />
              </div>
              <div class="h4 value">{{consumeData[4]?.KWh}} kWh</div>
            </div>
          </nb-card-body>
        </nb-card>
      </div>

      <div class="col-md-6">
        <nb-card>
          <nb-card-header>Manual Encode</nb-card-header>
          <nb-card-body>
            <div echarts [options]="option" class="echart"></div>
            <div class="info">
              <div class="h4 value">16.521 kWh</div>
              
              <div>
                <img
                  src="./assets/img/me.png"
                  class="rounded float-right"
                  width="80px"
                  alt="..."
                />
              </div>
            </div>
          </nb-card-body>
        </nb-card>
      </div> -->
    </div>

    </nb-tab>

    <nb-tab tabTitle="Llegadas">

      <div class="row show-grid">
                
        <!-- <div class="col-md-4">
        <nb-card>
          <nb-card-header>{{consumeData[1]?.ZoneName}}</nb-card-header>
          <nb-card-body>
            <div echarts [options]="options2" class="echart"></div>
            <div class="info">
              <div class="h4 value">{{consumeData[1]?.KWh}} kWh</div>
              <div>
                <img
                  src="./assets/img/me.png"
                  class="rounded float-right"
                  width="80px"
                  alt="..."
                />
              </div>
            </div>
          </nb-card-body>
        </nb-card>
      </div>

      <div class="col-md-4">
        <nb-card>
          <nb-card-header>{{consumeData[2]?.ZoneName}}</nb-card-header>
          <nb-card-body>
            <div echarts [options]="options2" class="echart"></div>
            <div class="info">
              <div class="h4 value">{{consumeData[2]?.KWh}} kWh</div>
              <div>
                <img
                  src="./assets/img/me.png"
                  class="rounded float-right"
                  width="80px"
                  alt="..."
                />
              </div>
            </div>
          </nb-card-body>
        </nb-card>
      </div> -->

      <div class="col-md-4">
        <nb-card>
          <nb-card-header>Inbound 3</nb-card-header>
          <nb-card-body>
            <div echarts [options]="option" class="echart"></div>
            <div class="info">
            <div>
                <img
                  src="./assets/img/me.png"
                  class="rounded float-right"
                  width="80px"
                  alt="..."
                />
              </div>
              <div class="h4 value">16.521 kWh</div>
            </div>
          </nb-card-body>
        </nb-card>
      </div>

            </div>
        </nb-tab>

    </nb-tabset>
</div>
  `,
})
export class SolarComponent implements AfterViewInit, OnDestroy {
  
  // public value: SolarEnergyStatistics

  public value: consume

  public consumeData: consume[]=[];

  public values: consume

  private alive=true;

  @Input('chartValue')
  set chartValue(value: consume) {
    debugger
    // this.value[0].porcent = value[0]?.porcent
    this.value = value
    console.log('testEner: ', this.value)

    if (this.option.series) {
      this.option.series[0].data[0].value = value[0]?.porcent
      this.option.series[0].data[1].value = 100 - value[0]?.porcent
      this.option.series[1].data[0].value = value[0]?.porcent
    }
  }

  
  // set chartValues(values: consume) {
  //   values.porcent = values.porcent
  //   this.values = values
  //   console.log('Por: ', values.porcent);
  //   console.log('Porcentaje: ', this.values);
  //   // debugger
  //   if (this.option.series) {
  //     this.option.series[0].data[0].value = values.porcent
  //     this.option.series[0].data[1].value = 100 - values.porcent
  //     this.option.series[1].data[0].value = values.porcent
  //   }
  // }

// Variables
  option: any = {}
  options1: any = {}
  options2: any = {}
  themeSubscription: any

  constructor(
    private theme: NbThemeService,
    private http: HttpClient,
    private api: HttpService) {
    }

  ngAfterViewInit() {
    
    this.themeSubscription = this.theme
      .getJsTheme()
      .pipe(delay(1))
      .subscribe((config) => {
        const solarTheme: any = config.variables.solar

        this.option = Object.assign(
          {},
          {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)',
            },
            series: [
              {
                name: ' ',
                clockWise: true,
                hoverAnimation: false,
                type: 'pie',
                center: ['45%', '50%'],
                radius: solarTheme.radius,
                data: [
                  {
                    value: this.value[4]?.porcent,
                    name: ' ',
                    label: {
                      normal: {
                        position: 'center',
                        formatter: '{d}%',
                        textStyle: {
                          fontSize: '22',
                          fontFamily: config.variables.fontSecondary,
                          fontWeight: '600',
                          color: config.variables.fgHeading,
                        },
                      },
                    },
                    tooltip: {
                      show: false,
                    },
                    itemStyle: {
                      normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                          {
                            offset: 0,
                            color: solarTheme.gradientLeft,
                          },
                          {
                            offset: 1,
                            color: solarTheme.gradientRight,
                          },
                        ]),
                        shadowColor: solarTheme.shadowColor,
                        shadowBlur: 0,
                        shadowOffsetX: 0,
                        shadowOffsetY: 3,
                      },
                    },
                    hoverAnimation: false,
                  },
                  {
                    value: 100 - this.value[4]?.porcent,
                    name: ' ',
                    tooltip: {
                      show: false,
                    },
                    label: {
                      normal: {
                        position: 'inner',
                      },
                    },
                    itemStyle: {
                      normal: {
                        color: solarTheme.secondSeriesFill,
                      },
                    },
                  },
                ],
              },
              {
                name: ' ',
                clockWise: true,
                hoverAnimation: false,
                type: 'pie',
                center: ['45%', '50%'],
                radius: solarTheme.radius,
                data: [
                  {
                    value: this.value[4]?.porcent,
                    name: ' ',
                    label: {
                      normal: {
                        position: 'inner',
                        show: false,
                      },
                    },
                    tooltip: {
                      show: false,
                    },
                    itemStyle: {
                      normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                          {
                            offset: 0,
                            color: solarTheme.gradientLeft,
                          },
                          {
                            offset: 1,
                            color: solarTheme.gradientRight,
                          },
                        ]),
                        shadowColor: solarTheme.shadowColor,
                        shadowBlur: 7,
                      },
                    },
                    hoverAnimation: false,
                  },
                  {
                    value: this.value[4]?.porcent,
                    name: ' ',
                    tooltip: {
                      show: false,
                    },
                    label: {
                      normal: {
                        position: 'inner',
                      },
                    },
                    itemStyle: {
                      normal: {
                        color: 'none',
                      },
                    },
                  },
                ],
              },
            ],
          },
        )
        // ,


        // this.options1 = Object.assign(
        //   {},
        //   {
        //     tooltip: {
        //       trigger: 'item',
        //       formatter: '{a} <br/>{b} : {c} ({d}%)',
        //     },
        //     series: [
        //       {
        //         name: ' ',
        //         clockWise: true,
        //         hoverAnimation: false,
        //         type: 'pie',
        //         center: ['45%', '50%'],
        //         radius: solarTheme.radius,
        //         data: [
        //           {
        //             value: this.value[2]?.porcent,
        //             name: ' ',
        //             label: {
        //               normal: {
        //                 position: 'center',
        //                 formatter: '{d}%',
        //                 textStyle: {
        //                   fontSize: '22',
        //                   fontFamily: config.variables.fontSecondary,
        //                   fontWeight: '600',
        //                   color: config.variables.fgHeading,
        //                 },
        //               },
        //             },
        //             tooltip: {
        //               show: false,
        //             },
        //             itemStyle: {
        //               normal: {
        //                 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //                   {
        //                     offset: 0,
        //                     color: solarTheme.gradientLeft,
        //                   },
        //                   {
        //                     offset: 1,
        //                     color: solarTheme.gradientRight,
        //                   },
        //                 ]),
        //                 shadowColor: solarTheme.shadowColor,
        //                 shadowBlur: 0,
        //                 shadowOffsetX: 0,
        //                 shadowOffsetY: 3,
        //               },
        //             },
        //             hoverAnimation: false,
        //           },
        //           {
        //             value: 100 - this.value[2]?.porcent,
        //             name: ' ',
        //             tooltip: {
        //               show: false,
        //             },
        //             label: {
        //               normal: {
        //                 position: 'inner',
        //               },
        //             },
        //             itemStyle: {
        //               normal: {
        //                 color: solarTheme.secondSeriesFill,
        //               },
        //             },
        //           },
        //         ],
        //       },
        //       {
        //         name: ' ',
        //         clockWise: true,
        //         hoverAnimation: false,
        //         type: 'pie',
        //         center: ['45%', '50%'],
        //         radius: solarTheme.radius,
        //         data: [
        //           {
        //             value: this.value[2]?.porcent,
        //             name: ' ',
        //             label: {
        //               normal: {
        //                 position: 'inner',
        //                 show: false,
        //               },
        //             },
        //             tooltip: {
        //               show: false,
        //             },
        //             itemStyle: {
        //               normal: {
        //                 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //                   {
        //                     offset: 0,
        //                     color: solarTheme.gradientLeft,
        //                   },
        //                   {
        //                     offset: 1,
        //                     color: solarTheme.gradientRight,
        //                   },
        //                 ]),
        //                 shadowColor: solarTheme.shadowColor,
        //                 shadowBlur: 7,
        //               },
        //             },
        //             hoverAnimation: false,
        //           },
        //           {
        //             value: this.value[2]?.porcent,
        //             name: ' ',
        //             tooltip: {
        //               show: false,
        //             },
        //             label: {
        //               normal: {
        //                 position: 'inner',
        //               },
        //             },
        //             itemStyle: {
        //               normal: {
        //                 color: 'none',
        //               },
        //             },
        //           },
        //         ],
        //       },
        //     ],
        //   },
        // ),

        // this.options2 = Object.assign(
        //   {},
        //   {
        //     tooltip: {
        //       trigger: 'item',
        //       formatter: '{a} <br/>{b} : {c} ({d}%)',
        //     },
        //     series: [
        //       {
        //         name: ' ',
        //         clockWise: true,
        //         hoverAnimation: false,
        //         type: 'pie',
        //         center: ['45%', '50%'],
        //         radius: solarTheme.radius,
        //         data: [
        //           {
        //             value: this.value[3]?.porcent,
        //             name: ' ',
        //             label: {
        //               normal: {
        //                 position: 'center',
        //                 formatter: '{d}%',
        //                 textStyle: {
        //                   fontSize: '22',
        //                   fontFamily: config.variables.fontSecondary,
        //                   fontWeight: '600',
        //                   color: config.variables.fgHeading,
        //                 },
        //               },
        //             },
        //             tooltip: {
        //               show: false,
        //             },
        //             itemStyle: {
        //               normal: {
        //                 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //                   {
        //                     offset: 0,
        //                     color: solarTheme.gradientLeft,
        //                   },
        //                   {
        //                     offset: 1,
        //                     color: solarTheme.gradientRight,
        //                   },
        //                 ]),
        //                 shadowColor: solarTheme.shadowColor,
        //                 shadowBlur: 0,
        //                 shadowOffsetX: 0,
        //                 shadowOffsetY: 3,
        //               },
        //             },
        //             hoverAnimation: false,
        //           },
        //           {
        //             value: 100 - this.value[3]?.porcent,
        //             name: ' ',
        //             tooltip: {
        //               show: false,
        //             },
        //             label: {
        //               normal: {
        //                 position: 'inner',
        //               },
        //             },
        //             itemStyle: {
        //               normal: {
        //                 color: solarTheme.secondSeriesFill,
        //               },
        //             },
        //           },
        //         ],
        //       },
        //       {
        //         name: ' ',
        //         clockWise: true,
        //         hoverAnimation: false,
        //         type: 'pie',
        //         center: ['45%', '50%'],
        //         radius: solarTheme.radius,
        //         data: [
        //           {
        //             value: this.value[3]?.porcent,
        //             name: ' ',
        //             label: {
        //               normal: {
        //                 position: 'inner',
        //                 show: false,
        //               },
        //             },
        //             tooltip: {
        //               show: false,
        //             },
        //             itemStyle: {
        //               normal: {
        //                 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //                   {
        //                     offset: 0,
        //                     color: solarTheme.gradientLeft,
        //                   },
        //                   {
        //                     offset: 1,
        //                     color: solarTheme.gradientRight,
        //                   },
        //                 ]),
        //                 shadowColor: solarTheme.shadowColor,
        //                 shadowBlur: 7,
        //               },
        //             },
        //             hoverAnimation: false,
        //           },
        //           {
        //             value: this.value[3]?.porcent,
        //             name: ' ',
        //             tooltip: {
        //               show: false,
        //             },
        //             label: {
        //               normal: {
        //                 position: 'inner',
        //               },
        //             },
        //             itemStyle: {
        //               normal: {
        //                 color: 'none',
        //               },
        //             },
        //           },
        //         ],
        //       },
        //     ],
        //   },
        // )

      })
  }

  ngOnInit(): void {
    this.consumeCharge();
  }

  public consumeCharge(){
    this.http.get(this.api.apiUrlNode1 + '/GetKwhZone')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
      this.consumeData = res;
      console.log('consume', this.consumeData);
      // debugger
      // if (this.option.series) {
      //   this.option.series[0].data[0].value = this.consumeData[0]?.porcent
      //   this.option.series[0].data[1].value = 100 - this.consumeData[0]?.porcent
      //   this.option.series[1].data[0].value = this.consumeData[0]?.porcent
      //   console.log("J:",this.option.series)
      // } 
      
      // console.log("Jo:",this.option.series)

    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe()
  }
}
