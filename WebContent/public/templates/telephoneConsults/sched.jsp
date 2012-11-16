<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@page contentType="text/xml" %>
<appointments>
                        
	<c:forEach items="${schedule}" var="appt" varStatus="rowCounter">
		<appointment  id="${appt.teleConId}" >
			<client>
				<name>${appt.clientName}</name>
				<id>${appt.pawsPatUnitNbr}</id>
			</client>
			<start>
				<fmt:formatDate value="${appt.when}" type="both" 
					pattern="MMMM d, yyyy HH:mm:ss" />
			</start>
		</appointment>
	</c:forEach>
		
</appointments>
