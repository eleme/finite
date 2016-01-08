init.sh:
	@                                                       \
	for i in $$(find src -name 'init.sh' -type f); do       \
	  cd $$(dirname $$i);                                   \
	  sh $$(basename $$i);                                  \
	done;                                                   \
