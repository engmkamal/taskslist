import * as React from 'react';
import { ITaskslistSpfxProps } from './ITaskslistSpfxProps';
import { 
  SPFI 
} from '@pnp/sp';
import { getSP } from '../../../pnpjsConfig';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/items/get-all";
import "@pnp/sp/site-users/web";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import * as moment from 'moment';
//import { Dropdown, IDropdownOption, Pivot, PivotItem, PrimaryButton, TextField, values } from 'office-ui-fabric-react';

import { 
  useMemo, 
  //useState, useCallback, useRef,
} from 'react';

import {
  ColDef,
  // ColGroupDef,Grid,GridOptions,ICellRendererParams,
} from '@ag-grid-community/core';

export interface IAuthor {
  Id: number;
  Title: string;
}

export interface IUrl {
  Url: string;
}

export interface IRowData {
  Id?: number;
  Title?: string;
  TaskId?: string;
  ProductName?: string;
  Category?: string;
  SubCategory?: string;
  Author?: IAuthor;
  Status?: string;
  Created?: Date;           
  Modified?: Date;
  URL?: IUrl;
  AssignedToId?: number[];
  DelegateUserId?: number[];
 
}

export interface IFile {
  Id?: number;
  Title?: string;
  TaskId?: string;
  ProductName?: string;
  Category?: string;
  SubCategory?: string;
  Author?: IAuthor;
  Status?: string;
  Created?: Date;           
  Modified?: Date;
  URL?: IUrl;
  AssignedToId?: number[];
  DelegateUserId?: number[];
}

export interface ITasks {
  Title?: string;
  Product?: string;
  Category?: string;
  SubCategory?: string;
  Initiator?: string;
  Status?: string;
  Created?: Date;
  Modified?: Date;
  RequestLink?: string; 
}

export interface IResponseFile {
  Length: number;
}

export interface IResponseItem {
  Id: number;
  File?: IResponseFile;
  FileLeafRef?: string;
  Title: string;  
}

export interface IPnPjsV3Props {}

export interface IColDef {
  field: string;
  filter?: string;
  enableRowGroup?: boolean;
  headerName?: string;
  width?: number; 
  maxWidth?: number;
  resizable?: boolean;
}

export interface IPnPjsV3State {
  items: IFile[];
  columnDefs: IColDef[];
  rowData?: IFile[];
  onFilterTextBoxChanged?: any,
  defaultColDef?: ColDef[];
}


export class PnPjsV3State implements IPnPjsV3State {
  constructor(
    public items: IFile[] = [],
    public columnDefs: IColDef[] = [],
    public rowData: IFile[] = [],
  ) { }
}



export default class TaskslistSpfx extends React.Component<ITaskslistSpfxProps, IPnPjsV3State, {}> {
  
  private LIST_NAME: string = "Tasks";
  private _sp: SPFI;
  private gridApi:any;

  constructor(props: ITaskslistSpfxProps) {
    super(props);
    this.state = new PnPjsV3State();
    this._sp = getSP(props.context);
  }

  public componentDidMount(): void {
    this._readAllItems().then((items) => { console.log() }).catch(err => console.error(err));    
    this._readAllItems2().then((items) => { console.log() }).catch(err => console.error(err));    
    this._readAllItems3().then((items) => { console.log() }).catch(err => console.error(err));    
    this._readAllItems4().then((items) => { console.log() }).catch(err => console.error(err));    
    //this._readFilterText().then((items) => { console.log() }).catch(err => console.error(err));    
  }

  private _readAllItems = async (): Promise<void> => {
    try {

      const user = await this._sp.web.currentUser(); 

      const userId = await user.Id; 

      const response: IResponseItem[] | any = await this._sp.web.lists.getByTitle(this.LIST_NAME).items
      .orderBy("ID", false)
      .filter("Status eq 'Pending' and (AssignedToId ne null or DelegateUserId ne null)")
      .select("AssignedToId", "DelegateUserId", "URL", "TaskId", "ProductName", "Category", "SubCategory", "Modified", "Author/ID", "Author/Title", "Status")
      .expand("Author")
      .top(100)()      

      const items: IRowData[] = await (response.filter((item: IRowData) => {

        return (item.Status == 'Pending' && (item.AssignedToId != null && item.AssignedToId.includes(userId ))
        || item.Status == 'Pending' && (item.DelegateUserId != null && item.DelegateUserId.includes(userId)))

      }));
      
      // const items: any[] = ritems.map((item: IRowData) => {
      //   if(item.AssignedToId != null && item.AssignedToId.includes(userId)){ 

      //     myTasks.push({
      //       Title: item.TaskId || "",
      //       Product: item.ProductName || "",
      //       Category: item.Category || "",
      //       SubCategory: item.SubCategory || "",
      //       Initiator: item.Author.Title || "",
      //       Status: item.Status || "",
      //       Created: item.Created ,
      //       Modified: item.Modified,
      //       RequestLink: item.URL.Url || ""
      //     })

      //     return {
      //       Title: item.TaskId || "",
      //       Product: item.ProductName || "",
      //       Category: item.Category || "",
      //       SubCategory: item.SubCategory || "",
      //       Initiator: item.Author.Title || "",
      //       Status: item.Status || "",
      //       Created: item.Created || "",
      //       Modified: item.Modified || "",
      //       RequestLink: item.URL.Url || ""
      //     };           
          

      //   } else if(item.DelegateUserId != null && item.DelegateUserId.includes(userId)){

      //     myTasks.push({
      //       Title: item.TaskId || "",
      //       Product: item.ProductName || "",
      //       Category: item.Category || "",
      //       SubCategory: item.SubCategory || "",
      //       Initiator: item.Author.Title || "",
      //       Status: item.Status || "",
      //       Created: item.Created ,
      //       Modified: item.Modified,
      //       RequestLink: item.URL.Url || ""
      //     })

      //     return {
      //       Title: item.TaskId || "",
      //       Product: item.ProductName || "",
      //       Category: item.Category || "",
      //       SubCategory: item.SubCategory || "",
      //       Initiator: item.Author.Title || "",
      //       Status: item.Status || "",
      //       Created: item.Created || "",
      //       Modified: item.Modified || "",
      //       RequestLink: item.URL.Url || ""
      //     }; 

      //   } else {
      //     return false;
      //   } 

      // });

      const columnDefs: any = [
        { field: 'URL.Url', headerName: 'Action', width: 100, resizable: true,
        cellRenderer: function(params:any) {
          return <a href={params.value} target = "_self">View</a> ;
        }
        },
        { field: 'ProductName', filter: 'agSetColumnFilter', enableRowGroup: true, resizable: true,},
        { field: 'Category', filter: 'agSetColumnFilter', enableRowGroup: true, resizable: true,},
        { field: 'SubCategory', filter: 'agSetColumnFilter', enableRowGroup: true, resizable: true,},
        { field: 'Author.Title', headerName: 'Initiator', filter: 'agSetColumnFilter', enableRowGroup: true, resizable: true},
        { field: 'Modified', filter: 'agDateColumnFilter', enableRowGroup: true, resizable: true,
          valueFormatter: function (params:any) {
            return moment(params.value).format('D-MMM-YY h:mma');
          },
        }
      ]; 

      // const columnDefs: any = [
      //   { field: 'RequestLink'},
      //   { field: 'Product', filter: 'agSetColumnFilter', enableRowGroup: true},
      //   { field: 'Category', filter: 'agSetColumnFilter', enableRowGroup: true},
      //   { field: 'SubCategory', filter: 'agSetColumnFilter', enableRowGroup: true},
      //   { field: 'Initiator', filter: 'agSetColumnFilter', enableRowGroup: true},
      //   { field: 'Modified', filter: 'agSetColumnFilter', enableRowGroup: true}
      // ]; 
      
      this.setState({ items });
      this.setState({ columnDefs });

      const defaultColDef:any = useMemo<ColDef>(() => {
        return {
          flex: 1,
          editable: true,
        };
      }, []);

      this.setState({ defaultColDef });

    } catch (err) {
      console.error(`Error - ${JSON.stringify(err)} - `);
    }
  }

  private _readAllItems2 = async (): Promise<void> => {
    try {

      const user = await this._sp.web.currentUser(); 

      const userId = await user.Id; 

      const response: IResponseItem[] | any = await this._sp.web.lists.getByTitle(this.LIST_NAME).items
      .orderBy("ID", false)
      .filter("Status eq 'Pending' and (AssignedToId ne null or DelegateUserId ne null)")
      .select("AssignedToId", "DelegateUserId", "URL", "TaskId", "ProductName", "Category", "SubCategory", "Modified", "Author/ID", "Author/Title", "Status")
      .expand("Author")
      .top(500)()      

      const items: IRowData[] = await (response.filter((item: IRowData) => {

        return (item.Status == 'Pending' && (item.AssignedToId != null && item.AssignedToId.includes(userId ))
        || item.Status == 'Pending' && (item.DelegateUserId != null && item.DelegateUserId.includes(userId)))

      }));
      
      this.setState({ items });

    } catch (err) {
      console.error(`Error - ${JSON.stringify(err)} - `);
    }
  }

  private _readAllItems3 = async (): Promise<void> => {
    try {

      const user = await this._sp.web.currentUser(); 

      const userId = await user.Id; 

      const response: IResponseItem[] | any = await this._sp.web.lists.getByTitle(this.LIST_NAME).items
      .orderBy("ID", false)
      .filter("Status eq 'Pending' and (AssignedToId ne null or DelegateUserId ne null)")
      .select("AssignedToId", "DelegateUserId", "URL", "TaskId", "ProductName", "Category", "SubCategory", "Modified", "Author/ID", "Author/Title", "Status")
      .expand("Author")
      .top(5000)()      

      const items: IRowData[] = await (response.filter((item: IRowData) => {

        return (item.Status == 'Pending' && (item.AssignedToId != null && item.AssignedToId.includes(userId ))
        || item.Status == 'Pending' && (item.DelegateUserId != null && item.DelegateUserId.includes(userId)))

      }));
      
      this.setState({ items });

    } catch (err) {
      console.error(`Error - ${JSON.stringify(err)} - `);
    }
  }

  private _readAllItems4 = async (): Promise<void> => {
    try {

      const user = await this._sp.web.currentUser(); 

      const userId = await user.Id; 

      const response: IResponseItem[] | any = await this._sp.web.lists.getByTitle(this.LIST_NAME).items
      .select("AssignedToId", "DelegateUserId", "URL", "TaskId", "ProductName", "Category", "SubCategory", "Modified", "Author/ID", "Author/Title", "Status")
      .expand("Author")
      .getAll();

      const items: IRowData[] = await (response.filter((item: IRowData) => {

        return (item.Status == 'Pending' && (item.AssignedToId != null && item.AssignedToId.includes(userId ))
        || item.Status == 'Pending' && (item.DelegateUserId != null && item.DelegateUserId.includes(userId)))

      }));
      
      this.setState({ items });

    } catch (err) {
      console.error(`Error - ${JSON.stringify(err)} - `);
    }
  }
  
  private onFilterTextBoxChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void => {
    this.gridApi.setQuickFilter(
      event.target.value
      //(document.getElementById('filter-text-box') as HTMLInputElement).value
    );

  }

  // private onFilterTextBoxChanged(event?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>):any {
  //   this.gridApi.setQuickFilter(
  //     (document.getElementById('filter-text-box') as HTMLInputElement).value
  //   );

  // }

  onGridReady = (params:any) => {
    this.gridApi = params.api;
    //this.gridColumnApi = params.columnApi;
  };

  public render(): React.ReactElement<ITaskslistSpfxProps> {

    return (     
      
      <div className="ag-theme-alpine" style={{ height: 400, width: 1100 }} >       
        <input
          type="text"
          id="filter-text-box"
          placeholder="Search with any text..."
          onInput={(e: React.ChangeEvent<HTMLInputElement>): void => this.onFilterTextBoxChanged(e)}
        /> 
        <AgGridReact
          rowGroupPanelShow='always' 
          rowData={this.state.items} 
          columnDefs={this.state.columnDefs}
          pagination={true}
          rowHeight={30}
          onGridReady={this.onGridReady} >
        </AgGridReact>
      </div>
      
    );
  }

}

