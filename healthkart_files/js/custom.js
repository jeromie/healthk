$(document).ready(function(){
	// Reindex rows
	function reindexRows() {
		$('table.vendor-map-table tbody tr').each(function(i) {
		    var rowName = $(this).find('select').attr('name');
		    var rowGstn = $(this).find('input[type="text"]').attr('name');
		    var rowStatus = $(this).find('input[type="checkbox"]').attr('name');

		    rowName = rowName.replace(/\[\d+\]/g, '[' + i + ']');
		    rowGstn = rowGstn.replace(/\[\d+\]/g, '[' + i + ']');
		    rowStatus = rowStatus.replace(/\[\d+\]/g, '[' + i + ']');
		    $(this).find('select').attr({
		        'name': rowName
		    });
		    $(this).find('input[type="text"]').attr({
		        'name': rowGstn
		    });
		    $(this).find('input[type="checkbox"]').attr({
		        'name': rowStatus
		    });
		});
	}

	// Add new row
	$('body').on('click', '.add-row', function(e){
		e.preventDefault();
		var rowClone = $('.clone-row').clone().removeClass('clone-row').css('display', 'table-row');
		$('.vendor-map-table tbody').append(rowClone);
		rowClone = '';
		reindexRows();
	});

	// Delete a row
	$('body').on('click', '.del-row', function(e){
		e.preventDefault();
		$(this).closest('tr').remove();
		reindexRows();
	});

	// Vendor name select box linked
	$('body').on('change', '[name="retailStoreDTO.vendorId"]', function(e){
		var vendorval = $(this).val();
		var vendortxt = $(this).find(":selected").text();
		$('[name="retailStoreDTO.retailStoreVendorMappingDTOList[0].vendorId"]').val(vendorval).change();
		$('.gstn-warning').find('.owner-linking').text(vendortxt);
	});

	// GSTIN input linked
	$('body').on('blur', '[name="retailStoreDTO.gstin"]', function(e){
		var gstinval = $(this).val();
		$('[name="retailStoreDTO.retailStoreVendorMappingDTOList[0].gstn"]').val(gstinval);
		$('.vendor-map-table').removeClass('inactive');
		$('.add-row').removeClass('hidden');
		$('.gstn-warning').find('.gstn-linking').text(gstinval);
		$('.gstn-warning').removeClass('hidden');
	});

});