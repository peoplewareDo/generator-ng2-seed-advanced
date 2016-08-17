import {BaseComponent} from '../../frameworks/core/index';

@BaseComponent({
  moduleId: module.id,
  selector: 'sd-<%=name%>',
  templateUrl: '<%= name %>.component.html',
  styleUrls: ['<%= name %>component.css']
})
export class <%=name%>Component  {
  
}
